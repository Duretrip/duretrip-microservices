import { Injectable } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BROKERS_ADDRESS } from '../constants';

@Injectable()
export class KafkaService {
  getKafkaOptions(groupId: string): MicroserviceOptions {
    return {
      transport: Transport.KAFKA,

      options: {
        client: {
          brokers: [BROKERS_ADDRESS],
        },
        consumer: {
          groupId: groupId,
        },
      },
    };
  }
}
