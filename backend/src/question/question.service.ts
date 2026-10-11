import { Injectable, NotFoundException } from '@nestjs/common';
import type { Question } from '../generated/prisma/client';
import type { FindQuestionDto } from './dto/find-question.dto';
import type { CreateQuestionDto } from './dto/create-question.dto';
import type { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionService {
    constructor(private readonly prisma: PrismaService) {}

    findAll(query: FindQuestionDto): Promise<Question[]> {
        return this.prisma.question.findMany({
            where: {
                isActive: true,
                topic: query.topic,
                level: query.level,
            },
            orderBy: {
                id: 'asc',
            },
        });
    }

    async findOne(id: number): Promise<Question> {
        const question = await this.prisma.question.findFirst({
            where: {
                id,
                isActive: true,
            },
        });

        if (!question) {
            throw new NotFoundException(`Question with id ${id} not found`);
        }

        return question;
    }

    create(dto: CreateQuestionDto): Promise<Question> {
        return this.prisma.question.create({
            data: {
                topic: dto.topic,
                level: dto.level,
                text: dto.text,
                explanation: dto.explanation,
            },
        });
    }

    async update(id: number, dto: UpdateQuestionDto): Promise<Question> {
        await this.getQuestionOrThrow(id);

        return this.prisma.question.update({
            data: {
                topic: dto.topic,
                level: dto.level,
                text: dto.text,
                explanation: dto.explanation,
            },
            where: { id },
        });
    }

    deactivate(id: number): Promise<Question> {
        return this.setQuestionActive(id, false);
    }

    activate(id: number): Promise<Question> {
        return this.setQuestionActive(id, true);
    }

    private async getQuestionOrThrow(id: number): Promise<Question> {
        const question = await this.prisma.question.findUnique({
            where: { id },
        });

        if (!question) {
            throw new NotFoundException(`Question with id ${id} not found`);
        }

        return question;
    }

    private async setQuestionActive(
        id: number,
        isActive: boolean,
    ): Promise<Question> {
        const question = await this.getQuestionOrThrow(id);

        if (question.isActive === isActive) {
            return question;
        }

        return this.prisma.question.update({
            data: {
                isActive,
            },
            where: { id },
        });
    }
}
