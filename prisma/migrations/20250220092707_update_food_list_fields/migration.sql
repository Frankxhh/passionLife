/*
  Warnings:

  - Added the required column `carbs` to the `FoodList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat` to the `FoodList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protein` to the `FoodList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servingSize` to the `FoodList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodList" ADD COLUMN     "carbs" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "protein" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "servingSize" TEXT NOT NULL;
