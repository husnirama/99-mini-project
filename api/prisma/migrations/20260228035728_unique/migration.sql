/*
  Warnings:

  - A unique constraint covering the columns `[organizeBy,title]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Event_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "Event_organizeBy_title_key" ON "Event"("organizeBy", "title");
