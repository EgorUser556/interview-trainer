import {IsEnum, IsInt, Min} from 'class-validator';
import { Topic, Level } from "../../generated/prisma/enums";

export class CreateInterviewDto {
    @IsEnum(Topic)
    topic: Topic;

    @IsEnum(Level)
    level: Level;

    @IsInt()
    @Min(1)
    questionCount: number;
}