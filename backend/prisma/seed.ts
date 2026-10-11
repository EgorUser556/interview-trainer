import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import QUESTIONS from "./data/questions/config";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('Переменная DATABASE_URL не задана');
}

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ adapter });

const main = async (): Promise<void> => {
    let created = 0;
    for(const question of QUESTIONS) {
        const existingQuestion = await prisma.question.findFirst({
            where: {
                topic: question.topic,
                level: question.level,
                text: question.text,
            },
        });

        if (existingQuestion) {
            continue;
        }

        await prisma.question.create({
            data: question,
        });

        created++;
    }

    console.log(`${created} question have been created and added`);
}

main()
.catch((error: unknown) => {
    console.error(`Database error: ${error}`);
    process.exitCode = 1;
})
.finally(async () => {
    await prisma.$disconnect();
})