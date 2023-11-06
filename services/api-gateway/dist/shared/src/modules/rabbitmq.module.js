"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RabbitmqModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitmqModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const rabbitmq_service_1 = require("../services/rabbitmq.service");
let RabbitmqModule = RabbitmqModule_1 = class RabbitmqModule {
    static registerRmq({ tokenInjection, queue, }) {
        const providers = [
            {
                provide: tokenInjection,
                useFactory: (configService) => {
                    const USER = configService.get('RABBITMQ_USER');
                    const PASSWORD = configService.get('RABBITMQ_PASS');
                    const HOST = configService.get('RABBITMQ_HOST');
                    return microservices_1.ClientProxyFactory.create({
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
                            queue,
                            queueOptions: {
                                durable: true,
                            },
                        },
                    });
                },
                inject: [config_1.ConfigService],
            },
        ];
        return {
            module: RabbitmqModule_1,
            providers,
            exports: providers,
        };
    }
    static register({ tokenInjection, queue }) {
        return {
            module: RabbitmqModule_1,
            imports: [
                microservices_1.ClientsModule.registerAsync([
                    {
                        name: tokenInjection,
                        useFactory: (configService) => {
                            const USER = configService.get('RABBITMQ_USER');
                            const PASSWORD = configService.get('RABBITMQ_PASS');
                            const HOST = configService.get('RABBITMQ_HOST');
                            return {
                                transport: microservices_1.Transport.RMQ,
                                options: {
                                    urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
                                    queue,
                                    queueOptions: {
                                        durable: true,
                                    },
                                },
                            };
                        },
                        inject: [config_1.ConfigService],
                    },
                ]),
            ],
            exports: [microservices_1.ClientsModule],
        };
    }
};
RabbitmqModule = RabbitmqModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: './.env',
            }),
        ],
        providers: [rabbitmq_service_1.RabbitmqService],
        exports: [rabbitmq_service_1.RabbitmqService],
    })
], RabbitmqModule);
exports.RabbitmqModule = RabbitmqModule;
//# sourceMappingURL=rabbitmq.module.js.map