-- CreateEnum
CREATE TYPE "cancelActor" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "canceledAt" TIMESTAMP(3),
ADD COLUMN     "canceledBy" "cancelActor",
ADD COLUMN     "rejectedReason" TEXT;
