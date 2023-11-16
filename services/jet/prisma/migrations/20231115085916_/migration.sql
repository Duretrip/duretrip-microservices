-- DropForeignKey
ALTER TABLE "CapacitiesOnJets" DROP CONSTRAINT "CapacitiesOnJets_capacityId_fkey";

-- DropForeignKey
ALTER TABLE "CapacitiesOnJets" DROP CONSTRAINT "CapacitiesOnJets_jetId_fkey";

-- DropForeignKey
ALTER TABLE "FacilitiesOnJets" DROP CONSTRAINT "FacilitiesOnJets_facilityId_fkey";

-- DropForeignKey
ALTER TABLE "FacilitiesOnJets" DROP CONSTRAINT "FacilitiesOnJets_jetId_fkey";

-- DropForeignKey
ALTER TABLE "RangesOnJets" DROP CONSTRAINT "RangesOnJets_jetId_fkey";

-- DropForeignKey
ALTER TABLE "RangesOnJets" DROP CONSTRAINT "RangesOnJets_rangeId_fkey";

-- AddForeignKey
ALTER TABLE "RangesOnJets" ADD CONSTRAINT "RangesOnJets_jetId_fkey" FOREIGN KEY ("jetId") REFERENCES "Jet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RangesOnJets" ADD CONSTRAINT "RangesOnJets_rangeId_fkey" FOREIGN KEY ("rangeId") REFERENCES "Range"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CapacitiesOnJets" ADD CONSTRAINT "CapacitiesOnJets_jetId_fkey" FOREIGN KEY ("jetId") REFERENCES "Jet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CapacitiesOnJets" ADD CONSTRAINT "CapacitiesOnJets_capacityId_fkey" FOREIGN KEY ("capacityId") REFERENCES "Capacity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacilitiesOnJets" ADD CONSTRAINT "FacilitiesOnJets_jetId_fkey" FOREIGN KEY ("jetId") REFERENCES "Jet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacilitiesOnJets" ADD CONSTRAINT "FacilitiesOnJets_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
