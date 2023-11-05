import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { KafkaService } from '../services/kafka.service';
import { BROKERS_ADDRESS } from '../constants';

interface KafkaModuleOptions {
  tokenInjection: string;
  clientId: string;
  groupId: string;
}

@Module({
  imports: [],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {
  static register({
    tokenInjection,
    clientId,
    groupId,
  }: KafkaModuleOptions): DynamicModule {
    return {
      module: KafkaModule,
      imports: [
        ClientsModule.register([
          {
            name: tokenInjection,
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: clientId,
                brokers: [BROKERS_ADDRESS],
              },
              consumer: {
                groupId: groupId,
              },
            },
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
