import { Injectable } from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Facility as FacilityModel } from '@prisma/client';

@Injectable()
export class FacilityService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createFacilityDto: CreateFacilityDto): Promise<FacilityModel> {
    return await this.prisma.facility.create({
      data: {
        name: createFacilityDto.name,
      },
    });
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
    return await this.prisma.facility.update({
      where: { id },
      data: {
        name: updateFacilityDto.name,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.facility.delete({
      where: { id },
    });
  }
}
