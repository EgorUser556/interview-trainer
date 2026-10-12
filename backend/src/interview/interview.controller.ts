import { Controller } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InterviewService } from './interview.service';

@Controller('interview')
export class InterviewController {
    constructor(private readonly InterviewService: InterviewService) {}
}
