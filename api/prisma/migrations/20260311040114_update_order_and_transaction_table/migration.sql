/*
  Warnings:

  - You are about to drop the column `adminDecisionDeadlineAt` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `canceledAt` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `discountAmount` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `doneAt` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `expiredAt` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `paymentProofDeadlineAt` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `paymentProofUploadedAt` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `paymentProofUrl` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `promotionId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `rejectedAt` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `usedCouponCode` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `usedPoints` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `TransactionItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orderId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "orderStatus" AS ENUM ('PENDING', 'COMPLETED', 'EXPIRED', 'CANCELED');

-- CreateEnum
CREATE TYPE "paymentMethod" AS ENUM ('CARD', 'BANK_TRANSFER');

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_promotionId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionItem" DROP CONSTRAINT "TransactionItem_ticketTypeId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionItem" DROP CONSTRAINT "TransactionItem_transactionId_fkey";

-- DropIndex
DROP INDEX "Transaction_customerId_idx";

-- DropIndex
DROP INDEX "Transaction_eventId_idx";

-- DropIndex
DROP INDEX "Transaction_paymentProofDeadlineAt_idx";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "adminDecisionDeadlineAt",
DROP COLUMN "canceledAt",
DROP COLUMN "customerId",
DROP COLUMN "discountAmount",
DROP COLUMN "doneAt",
DROP COLUMN "eventId",
DROP COLUMN "expiredAt",
DROP COLUMN "paymentProofDeadlineAt",
DROP COLUMN "paymentProofUploadedAt",
DROP COLUMN "paymentProofUrl",
DROP COLUMN "promotionId",
DROP COLUMN "rejectedAt",
DROP COLUMN "subtotal",
DROP COLUMN "totalAmount",
DROP COLUMN "usedCouponCode",
DROP COLUMN "usedPoints",
ADD COLUMN     "orderId" INTEGER NOT NULL,
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "paymentMethod" "paymentMethod" NOT NULL,
ADD COLUMN     "paymentProof" TEXT,
ADD COLUMN     "verifiedAt" TIMESTAMP(3),
ADD COLUMN     "verifiedBy" INTEGER;

-- DropTable
DROP TABLE "TransactionItem";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER,
    "eventId" INTEGER NOT NULL,
    "ticketTypeId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" INTEGER NOT NULL,
    "subTotalAmount" INTEGER NOT NULL,
    "discountAmount" INTEGER NOT NULL DEFAULT 0,
    "totalAmount" INTEGER NOT NULL,
    "promotionId" INTEGER,
    "voucherCode" TEXT,
    "buyerName" TEXT NOT NULL,
    "buyerEmail" TEXT NOT NULL,
    "buyerPhone" TEXT NOT NULL,
    "status" "orderStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Order_customerId_idx" ON "Order"("customerId");

-- CreateIndex
CREATE INDEX "Order_eventId_idx" ON "Order"("eventId");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "Transaction_orderId_idx" ON "Transaction"("orderId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_ticketTypeId_fkey" FOREIGN KEY ("ticketTypeId") REFERENCES "TicketType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_verifiedBy_fkey" FOREIGN KEY ("verifiedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
