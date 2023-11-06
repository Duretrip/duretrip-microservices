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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MailService_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("@dure-trips/shared/constants");
const bull_1 = require("bull");
const bull_2 = require("@nestjs/bull");
let MailService = MailService_1 = class MailService {
    constructor(_mailQueue) {
        this._mailQueue = _mailQueue;
        this._logger = new common_1.Logger(MailService_1.name);
    }
    async sendConfirmationEmail(payload) {
        try {
            await this._mailQueue.add(constants_1.CONFIRM_REGISTRATION, payload, {
                removeOnComplete: true,
            });
        }
        catch (error) {
            this._logger.error(`Error queueing registration email to user ${payload.emailAddress}`);
            throw error;
        }
    }
    async forgotPasswordEmail(payload) {
        try {
            await this._mailQueue.add(constants_1.FORGOT_PASSWORD, payload, {
                removeOnComplete: true,
            });
        }
        catch (error) {
            this._logger.error(`Error queueing registration email to user ${payload.email}`);
            throw error;
        }
    }
};
MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_2.InjectQueue)(constants_1.MAIL_QUEUE)),
    __metadata("design:paramtypes", [typeof (_a = typeof bull_1.Queue !== "undefined" && bull_1.Queue) === "function" ? _a : Object])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map