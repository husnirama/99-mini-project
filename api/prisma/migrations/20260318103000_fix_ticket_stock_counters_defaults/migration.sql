UPDATE "TicketType"
SET "sold" = 0
WHERE "sold" IS NULL;

UPDATE "TicketType"
SET "reserved" = 0
WHERE "reserved" IS NULL;

ALTER TABLE "TicketType"
ALTER COLUMN "sold" SET DEFAULT 0,
ALTER COLUMN "reserved" SET DEFAULT 0;

ALTER TABLE "TicketType"
ALTER COLUMN "sold" SET NOT NULL,
ALTER COLUMN "reserved" SET NOT NULL;
