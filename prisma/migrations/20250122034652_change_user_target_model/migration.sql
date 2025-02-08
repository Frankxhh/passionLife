/*
  Warnings:

  - Added the required column `userId` to the `UserTarget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserTarget" ADD COLUMN     "userId" TEXT NOT NULL;
