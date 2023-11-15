import { Injectable } from '@nestjs/common';
import { CreateRangeDto } from './dto/create-range.dto';
import { UpdateRangeDto } from './dto/update-range.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Range as RangeModel } from '@prisma/client';

@Injectable()
export class RangeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRangeDto: CreateRangeDto): Promise<RangeModel> {
    return await this.prisma.range.create({
      data: {
        name: createRangeDto.name,
      },
    });
  }

  async findAll() {
    return await this.prisma.range.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.range.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateRangeDto: UpdateRangeDto) {
    return await this.prisma.range.update({
      where: { id },
      data: {
        name: updateRangeDto.name,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.range.delete({
      where: {
        id,
      },
    });
  }
}
