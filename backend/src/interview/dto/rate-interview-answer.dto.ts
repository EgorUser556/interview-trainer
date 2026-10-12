import { IsEnum } from 'class-validator';
import { SelfRating } from '../../generated/prisma/enums';

export class RateInterviewAnswerDto {
    @IsEnum(SelfRating)
    selfRating: SelfRating;
}
