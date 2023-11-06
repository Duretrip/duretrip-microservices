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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailProcessor = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("bull");
const bull_2 = require("@nestjs/bull");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const constants_1 = require("@dure-trips/shared/constants");
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
__decorate([
    (0, bull_2.OnQueueActive)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof bull_1.Job !== "undefined" && bull_1.Job) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onActive", null);
__decorate([
    (0, bull_2.OnQueueCompleted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof bull_1.Job !== "undefined" && bull_1.Job) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onComplete", null);
__decorate([
    (0, bull_2.OnQueueFailed)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof bull_1.Job !== "undefined" && bull_1.Job) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onError", null);
__decorate([
    (0, bull_2.Process)(constants_1.CONFIRM_REGISTRATION),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof bull_1.Job !== "undefined" && bull_1.Job) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], MailProcessor.prototype, "confirmRegistration", null);
__decorate([
    (0, bull_2.Process)(constants_1.FORGOT_PASSWORD),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof bull_1.Job !== "undefined" && bull_1.Job) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], MailProcessor.prototype, "forgotPassword", null);
MailProcessor = MailProcessor_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, bull_2.Processor)(constants_1.MAIL_QUEUE),
    __metadata("design:paramtypes", [typeof (_a = typeof mailer_1.MailerService !== "undefined" && mailer_1.MailerService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], MailProcessor);
exports.MailProcessor = MailProcessor;
//# sourceMappingURL=mail.processor.js.map