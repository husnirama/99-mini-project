-- AlterTable
ALTER TABLE "TicketType" ADD COLUMN     "reserved" INTEGER,
ADD COLUMN     "sold" INTEGER;

-- CreateIndex
CREATE INDEX "Promotion_code_idx" ON "Promotion"("code");
