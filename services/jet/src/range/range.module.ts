import { Module } from '@nestjs/common';
import { RangeService } from './range.service';
import { RangeController } from './range.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RangeController],
  providers: [RangeService],
  exports: [RangeService],
})
export class RangeModule {}
