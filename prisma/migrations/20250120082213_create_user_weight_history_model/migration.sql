-- CreateTable
CREATE TABLE "UserWeightHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "bmi" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserWeightHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserWeightHistory_userId_date_idx" ON "UserWeightHistory"("userId", "date");
