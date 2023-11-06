import { DynamicModule } from '@nestjs/common';
interface RmqModuleOptions {
    tokenInjection: string;
    queue: string;
}
export declare class RabbitmqModule {
    static registerRmq({ tokenInjection, queue, }: RmqModuleOptions): DynamicModule;
    static register({ tokenInjection, queue }: RmqModuleOptions): DynamicModule;
}
export {};
