import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { InterviewStatus } from '../generated/prisma/enums';

import { CreateInterviewDto } from './dto/create-interview.dto';
import { RateInterviewAnswerDto } from './dto/rate-interview-answer.dto';
import { SaveInterviewAnswerDto } from './dto/save-interview-answer.dto';

@Injectable()
export class InterviewService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateInterviewDto) {
        const questions = await this.prisma.question.findMany({
            where: {
                topic: dto.topic,
                level: dto.level,
                isActive: true,
            },
            select: {
                id: true,
            },
        });

        if (questions.length < dto.questionCount) {
            throw new BadRequestException(
                `Not enough active questions: requested ${dto.questionCount}, available ${questions.length}.`,
            );
        }

        const shuffledQuestions = [...questions];

        for (let i = shuffledQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [shuffledQuestions[i], shuffledQuestions[j]] = [
                shuffledQuestions[j],
                shuffledQuestions[i],
            ];
        }

        const selectedQuestions = shuffledQuestions.slice(0, dto.questionCount);

        return this.prisma.interviewSession.create({
            data: {
                topic: dto.topic,
                level: dto.level,
                questions: {
                    create: selectedQuestions.map((question, index) => ({
                        position: index + 1,
                        question: {
                            connect: {
                                id: question.id,
                            },
                        },
                    })),
                },
            },
            include: {
                questions: {
                    orderBy: {
                        position: 'asc',
                    },
                    include: {
                        question: {
                            select: {
                                id: true,
                                text: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async findOne(sessionId: number) {
        const session = await this.prisma.interviewSession.findUnique({
            where: {
                id: sessionId,
            },
            include: {
                questions: {
                    orderBy: {
                        position: 'asc',
                    },
                    include: {
                        question: {
                            select: {
                                id: true,
                                text: true,
                                explanation: true,
                            },
                        },
                    },
                },
            },
        });

        if (!session) {
            throw new NotFoundException(
                `Interview session with id ${sessionId} doesn't exist`,
            );
        }

        const questions = session.questions.map((interviewQuestion) => {
            if (interviewQuestion.answer !== null) {
                return interviewQuestion;
            }

            return {
                ...interviewQuestion,
                question: {
                    id: interviewQuestion.question.id,
                    text: interviewQuestion.question.text,
                },
            };
        });

        return {
            ...session,
            questions,
        };
    }

    async findAll() {
        const sessions = await this.prisma.interviewSession.findMany({
            orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
            include: {
                _count: {
                    select: {
                        questions: true,
                    },
                },
            },
        });

        return sessions.map(({ _count, ...session }) => ({
            ...session,
            questionCount: _count.questions,
        }));
    }

    async saveAnswer(
        sessionId: number,
        interviewQuestionId: number,
        dto: SaveInterviewAnswerDto,
    ) {
        const session = await this.getSessionOrThrow(sessionId);

        if (session.status !== InterviewStatus.InProgress) {
            throw new ConflictException(
                'Cannot submit answers in a completed interview',
            );
        }

        const question = await this.getInterviewQuestionOrThrow(
            sessionId,
            interviewQuestionId,
        );

        if (question.answer !== null) {
            throw new ConflictException(
                'The answer has already been submitted and cannot be changed',
            );
        }

        const result = await this.prisma.interviewQuestion.updateMany({
            where: {
                id: interviewQuestionId,
                sessionId,
                answer: null,
                session: {
                    is: {
                        status: InterviewStatus.InProgress,
                    },
                },
            },
            data: {
                answer: dto.answer,
            },
        });

        if (result.count === 0) {
            throw new ConflictException(
                'The answer has already been submitted or the interview is no longer in progress',
            );
        }

        return this.prisma.interviewQuestion.findUniqueOrThrow({
            where: {
                id: interviewQuestionId,
                sessionId,
            },
            include: {
                question: {
                    select: {
                        id: true,
                        text: true,
                        explanation: true,
                    },
                },
            },
        });
    }

    async rateAnswer(
        sessionId: number,
        interviewQuestionId: number,
        dto: RateInterviewAnswerDto,
    ) {
        await this.getSessionOrThrow(sessionId);

        const question = await this.getInterviewQuestionOrThrow(
            sessionId,
            interviewQuestionId,
        );

        if (question.answer === null) {
            throw new ConflictException('Submit an answer before rating it');
        }

        return this.prisma.interviewQuestion.update({
            where: {
                id: interviewQuestionId,
                sessionId,
            },
            data: {
                selfRating: dto.selfRating,
            },
        });
    }

    async complete(sessionId: number) {
        const session = await this.getSessionOrThrow(sessionId);

        if (session.status === InterviewStatus.Completed) {
            return this.findOne(sessionId);
        }

        const result = await this.prisma.interviewSession.updateMany({
            where: {
                id: sessionId,
                status: InterviewStatus.InProgress,
                questions: {
                    some: {},
                    every: {
                        answer: {
                            not: null,
                        },
                        selfRating: {
                            not: null,
                        },
                    },
                },
            },
            data: {
                status: InterviewStatus.Completed,
                completedAt: new Date(),
            },
        });

        if (result.count === 0) {
            const currentSession = await this.getSessionOrThrow(sessionId);

            if (currentSession.status === InterviewStatus.Completed) {
                return this.findOne(sessionId);
            }

            throw new ConflictException(
                'Submit and rate all answers before completing the interview',
            );
        }

        return this.findOne(sessionId);
    }

    private async getSessionOrThrow(sessionId: number) {
        const session = await this.prisma.interviewSession.findUnique({
            where: {
                id: sessionId,
            },
        });

        if (!session) {
            throw new NotFoundException(
                `Interview session with id ${sessionId} doesn't exist`,
            );
        }

        return session;
    }

    private async getInterviewQuestionOrThrow(
        sessionId: number,
        interviewQuestionId: number,
    ) {
        const question = await this.prisma.interviewQuestion.findUnique({
            where: {
                id: interviewQuestionId,
                sessionId,
            },
        });

        if (!question) {
            throw new NotFoundException(
                `Interview question with id ${interviewQuestionId} was not found in session ${sessionId}`,
            );
        }

        return question;
    }
}
