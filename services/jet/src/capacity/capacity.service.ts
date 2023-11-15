import { Injectable } from '@nestjs/common';
import { CreateCapacityDto } from './dto/create-capacity.dto';
import { UpdateCapacityDto } from './dto/update-capacity.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Capacity as CapacityModel } from '@prisma/client';

@Injectable()
export class CapacityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCapacityDto: CreateCapacityDto): Promise<CapacityModel> {
    return await this.prisma.capacity.create({
      data: {
        name: createCapacityDto.name,
      },
    });
  }

  async findAll() {
    const capacity = await this.prisma.capacity.findMany();
    return capacity;
  }

  async findOne(id: number) {
    return await this.prisma.capacity.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateCapacityDto: UpdateCapacityDto) {
    return await this.prisma.capacity.update({
      where: {
        id,
      },
      data: {
        name: updateCapacityDto.name,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.capacity.delete({
      where: {
        id,
      },
    });
  }
}
