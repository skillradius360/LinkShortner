-- CreateTable
CREATE TABLE "public"."LinkTable" (
    "id" SERIAL NOT NULL,
    "mainLink" TEXT NOT NULL,
    "generatedLink" TEXT NOT NULL,
    "generatedUuid" TEXT NOT NULL,
    "visitedTypes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "LinkTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LinkTable_mainLink_key" ON "public"."LinkTable"("mainLink");

-- CreateIndex
CREATE UNIQUE INDEX "LinkTable_generatedLink_key" ON "public"."LinkTable"("generatedLink");

-- CreateIndex
CREATE UNIQUE INDEX "LinkTable_generatedUuid_key" ON "public"."LinkTable"("generatedUuid");
