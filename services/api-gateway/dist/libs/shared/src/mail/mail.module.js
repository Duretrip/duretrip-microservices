"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const config_1 = require("@nestjs/config");
const bull_1 = require("@nestjs/bull");
const constants_1 = require("@dure-trips/shared/constants");
const modules_1 = require("@dure-trips/shared/modules");
const mail_service_1 = require("./mail.service");
const mail_processor_1 = require("./mail.processor");
let MailModule = class MailModule {
};
MailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            modules_1.RabbitmqModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: './.env',
            }),
            bull_1.BullModule.registerQueueAsync({
                name: constants_1.MAIL_QUEUE,
                useFactory: (configService) => ({
                    redis: {
                        host: configService.get('REDIS_HOST'),
                        port: configService.get('REDIS_PORT'),
                        password: configService.get('REDIS_PASSWORD'),
                        retryStrategy(times) {
                            return Math.min(times * 50, 2000);
                        },
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            mailer_1.MailerModule.forRootAsync({
                useFactory: (configService) => ({
                    transport: {
                        host: configService.get('MAIL_HOST'),
                        port: +configService.get('MAIL_PORT'),
                        secure: false,
                        auth: {
                            user: configService.get('MAIL_USER'),
                            pass: configService.get('MAIL_PASSWORD'),
                        },
                        tls: { rejectUnauthorized: false },
                    },
                    defaults: {
                        from: `<${process.env.MAIL_FROM}>`,
                    },
                    template: {
                        dir: __dirname + '/templates',
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: { strict: true },
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            bull_1.BullModule.registerQueue({
                name: constants_1.MAIL_QUEUE,
            }),
        ],
        providers: [mail_service_1.MailService, mail_processor_1.MailProcessor],
        exports: [mail_service_1.MailService],
    })
], MailModule);
exports.MailModule = MailModule;
//# sourceMappingURL=mail.module.js.map