/*
  Warnings:

  - Made the column `height` on table `UserInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `weight` on table `UserInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bmi` on table `UserInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bmi` on table `UserWeightHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserInfo" ALTER COLUMN "height" SET NOT NULL,
ALTER COLUMN "weight" SET NOT NULL,
ALTER COLUMN "bmi" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserWeightHistory" ALTER COLUMN "bmi" SET NOT NULL;
