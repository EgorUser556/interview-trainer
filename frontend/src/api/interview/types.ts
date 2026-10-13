import { LEVEL, TOPIC } from '../../components/CreateInterviewForm/config.ts';

export interface InterviewQuestionPreview {
    id: number;
    text: string;
}

export interface CreatedSessionQuestion {
    id: number;
    sessionId: number;
    questionId: number;
    position: number;
    answer: null;
    selfRating: null;
    question: InterviewQuestionPreview;
}

export interface CreateInterviewResponse {
    id: number;
    topic: TOPIC;
    level: LEVEL;
    status: 'InProgress';
    createdAt: string;
    completedAt: null;
    questions: CreatedSessionQuestion[];
}
