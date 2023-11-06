"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var KafkaModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const kafka_service_1 = require("../services/kafka.service");
const constants_1 = require("../constants");
let KafkaModule = KafkaModule_1 = class KafkaModule {
    static register({ tokenInjection, clientId, groupId, }) {
        return {
            module: KafkaModule_1,
            imports: [
                microservices_1.ClientsModule.register([
                    {
                        name: tokenInjection,
                        transport: microservices_1.Transport.KAFKA,
                        options: {
                            client: {
                                clientId: clientId,
                                brokers: [constants_1.BROKERS_ADDRESS],
                            },
                            consumer: {
                                groupId: groupId,
                            },
                        },
                    },
                ]),
            ],
            exports: [microservices_1.ClientsModule],
        };
    }
};
KafkaModule = KafkaModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [kafka_service_1.KafkaService],
        exports: [kafka_service_1.KafkaService],
    })
], KafkaModule);
exports.KafkaModule = KafkaModule;
//# sourceMappingURL=kafka.module.js.map