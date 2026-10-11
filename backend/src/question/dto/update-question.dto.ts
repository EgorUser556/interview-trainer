import { IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { Level, Topic } from '../../generated/prisma/enums';

export class UpdateQuestionDto {
    @ValidateIf((_object, value) => value !== undefined)
    @IsEnum(Topic)
    topic?: Topic;

    @ValidateIf((_object, value) => value !== undefined)
    @IsEnum(Level)
    level?: Level;

    @ValidateIf((_object, value) => value !== undefined)
    @IsString()
    @IsNotEmpty()
    text?: string;

    @ValidateIf((_object, value) => value !== undefined)
    @IsString()
    @IsNotEmpty()
    explanation?: string;
}
