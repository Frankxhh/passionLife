-- CreateTable
CREATE TABLE "UserTarget" (
    "id" TEXT NOT NULL,
    "weeklyTrainingTarget" INTEGER NOT NULL,
    "weeklyDietTarget" INTEGER NOT NULL,
    "targetWeight" DOUBLE PRECISION NOT NULL,
    "targetBMI" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTarget_pkey" PRIMARY KEY ("id")
);
