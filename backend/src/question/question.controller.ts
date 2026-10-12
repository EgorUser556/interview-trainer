import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    Query,
    Patch,
    ParseIntPipe,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import type { Question } from '../generated/prisma/client';
import { FindQuestionDto } from './dto/find-question.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @Get()
    findAll(@Query() query: FindQuestionDto): Promise<Question[]> {
        return this.questionService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Question> {
        return this.questionService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateQuestionDto): Promise<Question> {
        return this.questionService.create(dto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateQuestionDto,
    ): Promise<Question> {
        return this.questionService.update(id, dto);
    }

    @Patch(':id/deactivate')
    deactivate(@Param('id', ParseIntPipe) id: number): Promise<Question> {
        return this.questionService.deactivate(id);
    }

    @Patch(':id/activate')
    activate(@Param('id', ParseIntPipe) id: number): Promise<Question> {
        return this.questionService.activate(id);
    }
}
