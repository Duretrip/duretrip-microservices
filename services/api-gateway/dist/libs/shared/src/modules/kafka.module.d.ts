import { DynamicModule } from '@nestjs/common';
interface KafkaModuleOptions {
    tokenInjection: string;
    clientId: string;
    groupId: string;
}
export declare class KafkaModule {
    static register({ tokenInjection, clientId, groupId, }: KafkaModuleOptions): DynamicModule;
}
export {};
