-- CreateEnum
CREATE TYPE "Level" AS ENUM ('Junior', 'Middle');

-- CreateEnum
CREATE TYPE "Topic" AS ENUM ('Javascript', 'Typescript', 'React');

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "topic" "Topic" NOT NULL,
    "level" "Level" NOT NULL,
    "text" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);
