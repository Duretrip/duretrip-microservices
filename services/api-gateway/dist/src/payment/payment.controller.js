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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const dto_1 = require("../../libs/shared/src/dto");
const guards_1 = require("../../libs/shared/src/guards");
const interceptors_1 = require("../../libs/shared/src/interceptors");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    makePayment(req, makePaymetDto) {
        if (!req?.user) {
            throw new common_1.BadRequestException();
        }
        console.log('Request User', req.user);
        const user = req?.user;
        return this.paymentService.makePayment({
            amount: makePaymetDto.amount,
            ...user,
        });
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.UseGuards)(guards_1.AuthGuard),
    (0, common_1.UseInterceptors)(interceptors_1.UserInterceptor),
    (0, common_1.Post)('pay'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.MakePaymentDto]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "makePayment", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map