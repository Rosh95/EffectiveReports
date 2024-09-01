-- CreateTable
CREATE TABLE "ReportData" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "ReportData_pkey" PRIMARY KEY ("id")
);
