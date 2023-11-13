-- CreateEnum
CREATE TYPE "AvailabilityStatusEnum" AS ENUM ('available', 'unavailable', 'hired');

-- CreateEnum
CREATE TYPE "StatusEnum" AS ENUM ('active', 'inactive');

-- CreateTable
CREATE TABLE "Jet" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "currentLocation" TEXT NOT NULL,
    "availabilityStatus" "AvailabilityStatusEnum" NOT NULL DEFAULT 'available',
    "status" "StatusEnum" NOT NULL DEFAULT 'active',
    "availableHours" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "priceDescription" TEXT NOT NULL,
    "pictures" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Jet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Range" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "StatusEnum" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Range_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RangesOnJets" (
    "jetId" INTEGER NOT NULL,
    "rangeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RangesOnJets_pkey" PRIMARY KEY ("jetId","rangeId")
);

-- CreateTable
CREATE TABLE "Capacity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "StatusEnum" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Capacity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CapacitiesOnJets" (
    "jetId" INTEGER NOT NULL,
    "capacityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CapacitiesOnJets_pkey" PRIMARY KEY ("jetId","capacityId")
);

-- CreateTable
CREATE TABLE "Facility" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "StatusEnum" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Facility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FacilitiesOnJets" (
    "jetId" INTEGER NOT NULL,
    "facilityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FacilitiesOnJets_pkey" PRIMARY KEY ("jetId","facilityId")
);

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
