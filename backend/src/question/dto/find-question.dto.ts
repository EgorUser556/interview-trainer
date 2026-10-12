import { IsEnum, IsOptional } from 'class-validator';
import { Level, Topic } from '../../generated/prisma/enums';

export class FindQuestionDto {
    @IsOptional()
    @IsEnum(Topic, {
        message: `Topic must be Javascript, Typescript or React`,
    })
    topic?: Topic;

    @IsOptional()
    @IsEnum(Level, {
        message: `Level must be Junior or Middle`,
    })
    level?: Level;
}
