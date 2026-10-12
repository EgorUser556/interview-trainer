import { IsString } from 'class-validator';

export class SaveInterviewAnswerDto {
    @IsString()
    answer: string;
}
