import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { PaymentsMicroserviceController } from './payments-microservice.controller';
import { PaymentsMicroserviceService } from './payments-microservice.service';
import {
  BROKERS_ADDRESS,
  ClientIds,
  ConsumerGroupIds,
  TokenInjections,
} from '@dure-trips/shared/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    ClientsModule.register([
      {
        name: TokenInjections.AUTH_MICROSERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: ClientIds.AUTH_CLIENT_ID,
            brokers: [BROKERS_ADDRESS],
          },
          consumer: {
            groupId: ConsumerGroupIds.AUTH_CONSUMER,
          },
        },
      },
    ]),
  ],
  controllers: [PaymentsMicroserviceController],
  providers: [PaymentsMicroserviceService],
})
export class PaymentsMicroserviceModule {}
