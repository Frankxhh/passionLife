/*
  Warnings:

  - Added the required column `totalCalories` to the `UserDietRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserDietRecord" ADD COLUMN     "totalCalories" DOUBLE PRECISION NOT NULL;
