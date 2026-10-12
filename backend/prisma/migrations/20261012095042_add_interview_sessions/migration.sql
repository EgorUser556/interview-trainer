-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('InProgress', 'Completed');

-- CreateEnum
CREATE TYPE "SelfRating" AS ENUM ('Incorrect', 'Partial', 'Correct');

-- CreateTable
CREATE TABLE "InterviewSession" (
    "id" SERIAL NOT NULL,
    "topic" "Topic" NOT NULL,
    "level" "Level" NOT NULL,
    "status" "InterviewStatus" NOT NULL DEFAULT 'InProgress',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "InterviewSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewQuestion" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "answer" TEXT,
    "selfRating" "SelfRating",

    CONSTRAINT "InterviewQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InterviewQuestion_sessionId_questionId_key" ON "InterviewQuestion"("sessionId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewQuestion_sessionId_position_key" ON "InterviewQuestion"("sessionId", "position");

-- AddForeignKey
ALTER TABLE "InterviewQuestion" ADD CONSTRAINT "InterviewQuestion_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "InterviewSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewQuestion" ADD CONSTRAINT "InterviewQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
