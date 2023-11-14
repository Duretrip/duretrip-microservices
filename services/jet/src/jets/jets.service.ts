import { ConflictException, Injectable } from '@nestjs/common';
import { CreateJetDto } from './dto/create-jet.dto';
import { UpdateJetDto } from './dto/update-jet.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Jet as JetModel } from '@prisma/client';

@Injectable()
export class JetsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createJetDto: CreateJetDto, userId: number): Promise<JetModel> {
    // return createJetDto;
    const {
      model,
      pictures,
      description,
      registrationNumber,
      currentLocation,
      availableHours,
      price,
      priceDescription,
      ranges,
      facilities,
      capacities,
    } = createJetDto;
    try {
      // Check if Registration number exist
      const regNumber = await this.prisma.jet.findUnique({
        where: {
          registrationNumber,
        },
        select: {
          id: true,
          model: true,
          registrationNumber: true,
        },
      });

      if (regNumber) {
        throw new ConflictException('Registration Number already exist!');
      }
      // TODO add Transaction

      const saveJet = await this.prisma.jet.create({
        data: {
          userId,
          model,
          description,
          registrationNumber,
          currentLocation,
          availableHours,
          price,
          priceDescription,
          pictures,
        },
      });

      // Jet Ranges
      const rangeData = ranges.map((id) => {
        return { jetId: saveJet.id, rangeId: id };
      });

      // Jet Facilities
      const facilityData = facilities.map((id) => {
        return { jetId: saveJet.id, facilityId: id };
      });

      // Jet Capacities
      const capacityata = capacities.map((id) => {
        return { jetId: saveJet.id, capacityId: id };
      });

      await Promise.all([
        this.prisma.rangesOnJets.createMany({
          data: rangeData,
        }),
        this.prisma.facilitiesOnJets.createMany({
          data: facilityData,
        }),
        this.prisma.capacitiesOnJets.createMany({
          data: capacityata,
        }),
      ]);
      return saveJet;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }

  async findAll() {
    const jets = await this.prisma.jet.findMany({
      include: {
        facilities: {
          select: {
            facility: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        capacities: {
          select: {
            capacity: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        ranges: {
          select: {
            range: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return jets;
  }

  async findOne(id: number) {
    const jet = await this.prisma.jet.findFirst({
      where: {
        id,
      },
      select: {
        model: true,
        description: true,
        registrationNumber: true,
        currentLocation: true,
        availableHours: true,
        price: true,
        priceDescription: true,
        createdAt: true,
        updatedAt: true,
        facilities: {
          select: {
            facility: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        ranges: {
          select: {
            range: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        capacities: {
          select: {
            capacity: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return jet;
  }

  async update(id: number, updateJetDto: UpdateJetDto) {
    const {
      model,
      pictures,
      description,
      registrationNumber,
      currentLocation,
      availableHours,
      price,
      priceDescription,
      ranges,
      facilities,
      capacities,
    } = updateJetDto;

    //Update and delete releted record
    const updatedJet = await this.prisma.jet.update({
      where: { id },
      data: {
        model,
        description,
        registrationNumber,
        currentLocation,
        availableHours,
        price,
        priceDescription,
        pictures,
        facilities: {
          deleteMany: {},
        },
        capacities: {
          deleteMany: {},
        },
        ranges: {
          deleteMany: {},
        },
      },
    });

    // Jet Ranges
    const rangeData = ranges.map((id) => {
      return { jetId: updatedJet.id, rangeId: id };
    });

    // Jet Facilities
    const facilityData = facilities.map((id) => {
      return { jetId: updatedJet.id, facilityId: id };
    });

    // Jet Capacities
    const capacityata = capacities.map((id) => {
      return { jetId: updatedJet.id, capacityId: id };
    });

    await Promise.all([
      this.prisma.rangesOnJets.createMany({
        data: rangeData,
      }),
      this.prisma.facilitiesOnJets.createMany({
        data: facilityData,
      }),
      this.prisma.capacitiesOnJets.createMany({
        data: capacityata,
      }),
    ]);

    return updatedJet;
  }

  async remove(id: number) {
    return await this.prisma.jet.delete({
      where: {
        id,
      },
    });
  }
}
