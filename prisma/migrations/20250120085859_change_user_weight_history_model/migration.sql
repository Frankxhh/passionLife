/*
  Warnings:

  - You are about to drop the column `createdAt` on the `UserWeightHistory` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `UserWeightHistory` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `UserWeightHistory` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserWeightHistory_userId_date_idx";

-- AlterTable
ALTER TABLE "UserWeightHistory" DROP COLUMN "createdAt",
DROP COLUMN "date",
DROP COLUMN "updatedAt",
ADD COLUMN     "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "UserWeightHistory_userId_recordedAt_idx" ON "UserWeightHistory"("userId", "recordedAt");
