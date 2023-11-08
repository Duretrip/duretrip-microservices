import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { PrismaClient as JetPrismaClient } from '@dare/jet/client';
@Injectable()
export class AppService {
  constructor(
    @Inject('JetPrismaClient')
    private jetPrismaClient: CustomPrismaService<JetPrismaClient>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
  async sayHi() {
    return await this.jetPrismaClient.client.jet.create({
      data: {
        model: '',
        description: '',
        userId: 1,
        registrationNumber: '',
        availabilityStatus: 'available',
        status: 'active',
        availableHours: '',
        price: 23,
        priceDescription: 56,
        pictures: {},
        currentLocation: '',
      },
    });
  }
}
