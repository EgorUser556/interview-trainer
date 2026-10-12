import { Level, Topic } from '../../generated/prisma/enums';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateQuestionDto {
    @IsEnum(Topic)
    topic: Topic;

    @IsEnum(Level)
    level: Level;

    @IsString()
    @IsNotEmpty()
    text: string;

    @IsString()
    @IsNotEmpty()
    explanation: string;
}
