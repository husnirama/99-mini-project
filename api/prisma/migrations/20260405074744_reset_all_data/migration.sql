-- CreateTable
CREATE TABLE "UserPromotion" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "promotionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(6) NOT NULL,
    "usedAt" TIMESTAMP(6),
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "UserPromotion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPromotion_userId_promotionId_key" ON "UserPromotion"("userId", "promotionId");

-- AddForeignKey
ALTER TABLE "UserPromotion" ADD CONSTRAINT "UserPromotion_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserPromotion" ADD CONSTRAINT "UserPromotion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
