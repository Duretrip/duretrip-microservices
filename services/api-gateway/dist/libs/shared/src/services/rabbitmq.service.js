"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitmqService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
let RabbitmqService = class RabbitmqService {
    constructor(configService) {
        this.configService = configService;
    }
    getRmqOptions(queue) {
        const USER = this.configService.get('RABBITMQ_USER');
        const PASSWORD = this.configService.get('RABBITMQ_PASS');
        const HOST = this.configService.get('RABBITMQ_HOST');
        return {
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
                noAck: false,
                queue,
                queueOptions: {
                    durable: true,
                },
            },
        };
    }
    acknowledgeMessage(context) {
        const channel = context.getChannelRef();
        const message = context.getMessage();
        channel.ack(message);
    }
};
exports.RabbitmqService = RabbitmqService;
exports.RabbitmqService = RabbitmqService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RabbitmqService);
//# sourceMappingURL=rabbitmq.service.js.map