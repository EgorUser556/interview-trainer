import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { QuestionService } from './question/question.service';
import { QuestionModule } from './question/question.module';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ObserveModule.forRoot({
            appKey: 'YOUR_APP_KEY',
            appSecret: 'YOUR_APP_SECRET',
            serviceId: 'backend',
        }),
        PrismaModule,
        QuestionModule,
    ],
    controllers: [AppController],
    providers: [AppService, QuestionService],
})
export class AppModule {}
