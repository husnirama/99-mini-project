-- CreateEnum
CREATE TYPE "pointsSource" AS ENUM ('REFERRAL', 'PURCHASE');

-- CreateTable
CREATE TABLE "Points" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "source" "pointsSource" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Points_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Points_userId_idx" ON "Points"("userId");

-- AddForeignKey
ALTER TABLE "Points" ADD CONSTRAINT "Points_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
