/*
  Warnings:

  - Added the required column `carbs` to the `UserDietRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat` to the `UserDietRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protein` to the `UserDietRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserDietRecord" ADD COLUMN     "carbs" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "protein" DOUBLE PRECISION NOT NULL;
