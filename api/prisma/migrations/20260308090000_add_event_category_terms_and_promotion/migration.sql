-- AlterTable
ALTER TABLE "Event"
ADD COLUMN     "category" TEXT,
ADD COLUMN     "termsAccepted" BOOLEAN NOT NULL DEFAULT false;

-- CreateEnum
CREATE TYPE "promotionDiscountType" AS ENUM ('PERCENTAGE', 'FIXED');

-- CreateTable
CREATE TABLE "Promotion" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discountType" "promotionDiscountType" NOT NULL,
    "discountValue" DECIMAL(65,30) NOT NULL,
    "maxDiscount" DECIMAL(65,30),
    "minPurchase" DECIMAL(65,30),
    "quota" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Promotion_eventId_idx" ON "Promotion"("eventId");

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
