-- CreateTable
CREATE TABLE "UserDietRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "mealType" TEXT NOT NULL,
    "servingSize" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserDietRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserDietRecord_userId_createdAt_idx" ON "UserDietRecord"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Training_userId_createdAt_idx" ON "Training"("userId", "createdAt");
