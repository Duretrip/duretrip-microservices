import { ConflictException, Injectable } from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Facility as FacilityModel } from '@prisma/client';

@Injectable()
export class FacilityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFacilityDto: CreateFacilityDto): Promise<FacilityModel> {
    try {
      const facility = await this.prisma.facility.findUnique({
        where: {
          name: createFacilityDto.name,
        },
      });

      if (facility) {
        throw new ConflictException('Name already exist!');
      }
      return await this.prisma.facility.create({
        data: {
          name: createFacilityDto.name,
          url: createFacilityDto.url,
        },
      });
    } catch (error) {
      return error.response;
    }
  }

  async findAll() {
    return await this.prisma.facility.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.facility.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateFacilityDto: UpdateFacilityDto) {
    try {
      const facility = await this.prisma.facility.findUnique({
        where: {
          name: updateFacilityDto.name,
        },
      });

      if (facility) {
        throw new ConflictException('Name already exist!');
      }
      return await this.prisma.facility.update({
        where: { id },
        data: {
          name: updateFacilityDto.name,
          url: updateFacilityDto.url,
        },
      });
    } catch (error) {
      return error.response;
    }
  }

  async remove(id: number) {
    return await this.prisma.facility.delete({
      where: { id },
    });
  }
}
