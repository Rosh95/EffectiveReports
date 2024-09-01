/*
  Warnings:

  - You are about to drop the column `documentId` on the `ReportTask` table. All the data in the column will be lost.
  - You are about to drop the column `service` on the `ReportTask` table. All the data in the column will be lost.
  - Added the required column `serviceName` to the `ReportTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReportTask" DROP COLUMN "documentId",
DROP COLUMN "service",
ADD COLUMN     "documentUrl" TEXT,
ADD COLUMN     "headers" TEXT[],
ADD COLUMN     "serviceName" TEXT NOT NULL;
