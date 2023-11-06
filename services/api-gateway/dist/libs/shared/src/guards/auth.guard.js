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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const constants_1 = require("../constants");
let AuthGuard = class AuthGuard {
    constructor(authClient) {
        this.authClient = authClient;
    }
    canActivate(context) {
        if (context.getType() !== 'http') {
            return false;
        }
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (!authHeader)
            return false;
        const authHeaderParts = authHeader.split(' ');
        if (authHeaderParts.length !== 2)
            return false;
        const [, jwt] = authHeaderParts;
        return this.authClient.send(constants_1.EventPatterns.verify_jwt, { jwt }).pipe((0, rxjs_1.switchMap)(({ exp }) => {
            if (!exp)
                return (0, rxjs_1.of)(false);
            const TOKEN_EXP_MS = exp * 1000;
            const isJwtValid = Date.now() < TOKEN_EXP_MS;
            return (0, rxjs_1.of)(isJwtValid);
        }), (0, rxjs_1.catchError)((error) => {
            console.log(error);
            throw new common_1.UnauthorizedException(error.message);
        }));
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.TokenInjections.AUTH_MICROSERVICE)),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map