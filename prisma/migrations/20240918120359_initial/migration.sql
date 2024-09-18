-- CreateEnum
CREATE TYPE "CampaignType" AS ENUM ('MARKETING', 'ADVERTISEMENT', 'GOVERNMENT', 'POLITICIAN');

-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('ACTIVE', 'PAUSED', 'EXPIRED');

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "signUpDate" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "StatusType" NOT NULL,
    "category" "CampaignType" NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);
