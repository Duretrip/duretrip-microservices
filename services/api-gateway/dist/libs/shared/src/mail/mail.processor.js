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
var MailProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailProcessor = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const constants_1 = require("../constants");
let MailProcessor = MailProcessor_1 = class MailProcessor {
    constructor(_mailerService, _configService) {
        this._mailerService = _mailerService;
        this._configService = _configService;
        this._logger = new common_1.Logger(MailProcessor_1.name);
    }
    onActive(job) {
        this._logger.debug(`Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(job.data)}`);
    }
    onComplete(job, result) {
        this._logger.debug(`Completed job ${job.id} of type ${job.name}.  Result: ${JSON.stringify(result)}`);
    }
    onError(job, error) {
        this._logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
    }
    async confirmRegistration(job) {
        this._logger.log(`Sending confirm registration email to '${job.data.emailAddress}'`);
        try {
            return this._mailerService.sendMail({
                to: job.data.emailAddress,
                from: this._configService.get('MAIL_FROM'),
                subject: 'Registration',
                template: './registration.hbs',
                context: { confirmUrl: job.data.confirmUrl },
            });
        }
        catch (error) {
            this._logger.error(`Failed to send email to '${job.data.emailAddress}'`, error.stack);
            throw error;
        }
    }
    async forgotPassword(job) {
        this._logger.log(`Sending reset password email to '${job.data.email}'`);
        try {
            return this._mailerService.sendMail({
                to: job.data.email,
                from: this._configService.get('MAIL_FROM'),
                subject: job.data.subject,
                template: './reset-password.hbs',
                context: {
                    name: job.data.name,
                    subject: job.data.subject.toLowerCase(),
                    url: job.data.url,
                },
            });
        }
        catch (error) {
            this._logger.error(`Failed to send email to '${job.data.email}'`, error.stack);
            throw error;
        }
    }
};
exports.MailProcessor = MailProcessor;
__decorate([
    (0, bull_1.OnQueueActive)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onActive", null);
__decorate([
    (0, bull_1.OnQueueCompleted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onComplete", null);
__decorate([
    (0, bull_1.OnQueueFailed)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onError", null);
__decorate([
    (0, bull_1.Process)(constants_1.CONFIRM_REGISTRATION),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MailProcessor.prototype, "confirmRegistration", null);
__decorate([
    (0, bull_1.Process)(constants_1.FORGOT_PASSWORD),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MailProcessor.prototype, "forgotPassword", null);
exports.MailProcessor = MailProcessor = MailProcessor_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, bull_1.Processor)(constants_1.MAIL_QUEUE),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        config_1.ConfigService])
], MailProcessor);
//# sourceMappingURL=mail.processor.js.map