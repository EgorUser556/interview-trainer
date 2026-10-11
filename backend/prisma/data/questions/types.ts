import type { Level, Topic } from '../../../src/generated/prisma/enums';

export interface IQuestion {
    topic: Topic;
    level: Level;
    text: string;
    explanation: string;
}