"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const constants_1 = require("../constants");
let KafkaService = class KafkaService {
    getKafkaOptions(groupId) {
        return {
            transport: microservices_1.Transport.KAFKA,
            options: {
                client: {
                    brokers: [constants_1.BROKERS_ADDRESS],
                },
                consumer: {
                    groupId: groupId,
                },
            },
        };
    }
};
KafkaService = __decorate([
    (0, common_1.Injectable)()
], KafkaService);
exports.KafkaService = KafkaService;
//# sourceMappingURL=kafka.service.js.map