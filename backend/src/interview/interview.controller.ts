import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { InterviewService } from './interview.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { SaveInterviewAnswerDto } from './dto/save-interview-answer.dto';
import { RateInterviewAnswerDto } from './dto/rate-interview-answer.dto';

@Controller('interview')
export class InterviewController {
    constructor(private readonly interviewService: InterviewService) {}

    @Post()
    create(@Body() dto: CreateInterviewDto) {
        return this.interviewService.create(dto);
    }

    @Get()
    findAll() {
        return this.interviewService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.interviewService.findOne(id);
    }

    @Patch(':sessionId/questions/:interviewQuestionId/answer')
    saveAnswer(
        @Param('sessionId', ParseIntPipe) id: number,
        @Param('interviewQuestionId', ParseIntPipe) interviewQuestionId: number,
        @Body() dto: SaveInterviewAnswerDto,
    ) {
        return this.interviewService.saveAnswer(id, interviewQuestionId, dto);
    }

    @Patch(':sessionId/questions/:interviewQuestionId/rating')
    rateAnswer(
        @Param('sessionId', ParseIntPipe) id: number,
        @Param('interviewQuestionId', ParseIntPipe) interviewQuestionId: number,
        @Body() dto: RateInterviewAnswerDto,
    ) {
        return this.interviewService.rateAnswer(id, interviewQuestionId, dto);
    }

    @Post(':sessionId/complete')
    @HttpCode(200)
    complete(@Param('sessionId', ParseIntPipe) id: number) {
        return this.interviewService.complete(id);
    }
}
