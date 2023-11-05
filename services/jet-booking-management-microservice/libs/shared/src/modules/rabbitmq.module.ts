import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { RabbitmqService } from '../services/rabbitmq.service';

interface RmqModuleOptions {
  tokenInjection: string;
  queue: string;
}
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
  ],
  providers: [RabbitmqService],
  exports: [RabbitmqService],
})
export class RabbitmqModule {
  static registerRmq({
    tokenInjection,
    queue,
  }: RmqModuleOptions): DynamicModule {
    const providers = [
      {
        provide: tokenInjection,
        useFactory: (configService: ConfigService) => {
          const USER = configService.get('RABBITMQ_USER');
          const PASSWORD = configService.get('RABBITMQ_PASS');
          const HOST = configService.get('RABBITMQ_HOST');

          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
              queue,
              queueOptions: {
                durable: true, // queue survives broker restart
              },
            },
          });
        },
        inject: [ConfigService],
      },
    ];

    return {
      module: RabbitmqModule,
      providers,
      exports: providers,
    };
  }

  static register({ tokenInjection, queue }: RmqModuleOptions): DynamicModule {
    return {
      module: RabbitmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: tokenInjection,
            useFactory: (configService: ConfigService) => {
              const USER = configService.get('RABBITMQ_USER');
              const PASSWORD = configService.get('RABBITMQ_PASS');
              const HOST = configService.get('RABBITMQ_HOST');

              return {
                transport: Transport.RMQ,
                options: {
                  urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
                  queue,
                  queueOptions: {
                    durable: true, // queue survives broker restart
                  },
                },
              };
            },
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
