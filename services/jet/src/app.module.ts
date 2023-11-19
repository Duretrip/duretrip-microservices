import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { PrismaModule } from './prisma/prisma.module';
import { JetsModule } from './jets/jets.module';
import { CapacityModule } from './capacity/capacity.module';
import { RangeModule } from './range/range.module';
import { FacilityModule } from './facility/facility.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    PrismaModule,
    JetsModule,
    FacilityModule,
    RangeModule,
    CapacityModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [RabbitMQService, AppService],
})
export class AppModule {}
