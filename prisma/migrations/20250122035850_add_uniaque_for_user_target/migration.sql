/*
  Warnings:

  - The primary key for the `UserTarget` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserTarget` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `UserTarget` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserTarget" DROP CONSTRAINT "UserTarget_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "UserTarget_userId_key" ON "UserTarget"("userId");
