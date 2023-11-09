import { Module } from '@nestjs/common';
import { JetsService } from './jets.service';
import { JetsController } from './jets.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [JetsController],
  providers: [JetsService],
  exports: [JetsService],
})
export class JetsModule {}
