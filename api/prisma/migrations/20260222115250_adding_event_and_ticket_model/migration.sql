-- CreateEnum
CREATE TYPE "eventStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ticketStatus" AS ENUM ('ACTIVE', 'SOLD_OUT', 'HIDDEN');

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "organizeBy" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "eventDateStart" TIMESTAMP(3) NOT NULL,
    "eventDateEnd" TIMESTAMP(3) NOT NULL,
    "status" "eventStatus" NOT NULL DEFAULT 'DRAFT',
    "eventDescription" TEXT NOT NULL,
    "eventTnC" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venue" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "addressLine" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketType" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "quota" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "salesStartAt" TIMESTAMP(3) NOT NULL,
    "salesEndAt" TIMESTAMP(3) NOT NULL,
    "status" "ticketStatus" NOT NULL DEFAULT 'ACTIVE',
    "contactPerson" TEXT NOT NULL,
    "emailContactPerson" TEXT NOT NULL,
    "phoneContactPerson" TEXT NOT NULL,

    CONSTRAINT "TicketType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_title_key" ON "Event"("title");

-- CreateIndex
CREATE INDEX "Event_organizeBy_idx" ON "Event"("organizeBy");

-- CreateIndex
CREATE INDEX "Venue_eventId_idx" ON "Venue"("eventId");

-- CreateIndex
CREATE INDEX "TicketType_eventId_idx" ON "TicketType"("eventId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizeBy_fkey" FOREIGN KEY ("organizeBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketType" ADD CONSTRAINT "TicketType_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
