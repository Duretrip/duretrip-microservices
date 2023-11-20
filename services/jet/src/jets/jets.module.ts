import { Module } from '@nestjs/common';
import { JetsService } from './jets.service';
import { JetsController } from './jets.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { PrismaExceptionFilter } from './prisma-exception.filter';

@Module({
  imports: [PrismaModule],
  controllers: [JetsController],
  providers: [
    JetsService,
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
  ],
  exports: [JetsService],
})
export class JetsModule {}
