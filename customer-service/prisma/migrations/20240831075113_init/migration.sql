/*
  Warnings:

  - You are about to drop the `ReportData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ReportData";

-- CreateTable
CREATE TABLE "CustomerData" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerData_email_key" ON "CustomerData"("email");
