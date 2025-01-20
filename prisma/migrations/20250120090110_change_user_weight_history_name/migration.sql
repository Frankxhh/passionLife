/*
  Warnings:

  - You are about to drop the `UserWeightHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UserWeightHistory";

-- CreateTable
CREATE TABLE "UserInfoHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "bmi" DOUBLE PRECISION NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserInfoHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserInfoHistory_userId_recordedAt_idx" ON "UserInfoHistory"("userId", "recordedAt");
