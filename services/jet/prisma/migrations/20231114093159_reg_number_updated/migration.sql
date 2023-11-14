/*
  Warnings:

  - A unique constraint covering the columns `[registrationNumber]` on the table `Jet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Jet_registrationNumber_key" ON "Jet"("registrationNumber");
