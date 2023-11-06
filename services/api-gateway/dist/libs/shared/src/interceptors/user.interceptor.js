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
exports.UserInterceptor = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const constants_1 = require("../constants");
let UserInterceptor = class UserInterceptor {
    constructor(authClient) {
        this.authClient = authClient;
    }
    intercept(ctx, next) {
        if (ctx.getType() !== 'http')
            return next.handle();
        const request = ctx.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (!authHeader)
            return next.handle();
        const authHeaderParts = authHeader.split(' ');
        if (authHeaderParts.length !== 2)
            return next.handle();
        const [, jwt] = authHeaderParts;
        return this.authClient
            .send(constants_1.EventPatterns.decode_jwt, { jwt })
            .pipe((0, rxjs_1.switchMap)(({ user }) => {
            console.log('Intercept User', user);
            request.user = user;
            return next.handle();
        }), (0, rxjs_1.catchError)(() => next.handle()));
    }
};
exports.UserInterceptor = UserInterceptor;
exports.UserInterceptor = UserInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.TokenInjections.AUTH_MICROSERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], UserInterceptor);
//# sourceMappingURL=user.interceptor.js.map