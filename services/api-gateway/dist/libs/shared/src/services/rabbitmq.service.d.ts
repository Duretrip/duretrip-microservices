import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions } from '@nestjs/microservices';
import { RabbitmqServiceInterface } from '../interfaces/rabbitmq.interface';
export declare class RabbitmqService implements RabbitmqServiceInterface {
    private readonly configService;
    constructor(configService: ConfigService);
    getRmqOptions(queue: string): RmqOptions;
    acknowledgeMessage(context: RmqContext): void;
}
