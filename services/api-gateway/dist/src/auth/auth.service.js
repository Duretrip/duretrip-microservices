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
exports.AuthService = void 0;
const constants_1 = require("../../libs/shared/src/constants");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let AuthService = class AuthService {
    constructor(authClient) {
        this.authClient = authClient;
    }
    createUser(createUserDto) {
        return this.authClient.send(constants_1.EventPatterns.create_user, createUserDto);
    }
    login(existingUserDTO) {
        return this.authClient.send(constants_1.EventPatterns.login, existingUserDTO);
    }
    loginCookiies(existingUserDTO) {
        return this.authClient.send(constants_1.EventPatterns.login, existingUserDTO);
    }
    getAllUsers() {
        return this.authClient.send(constants_1.EventPatterns.get_all_users, {});
    }
    getUser(userId) {
        return this.authClient.send(constants_1.EventPatterns.get_user, userId);
    }
    forgotPassword(forgotPasswordDto) {
        return this.authClient.send(constants_1.EventPatterns.forgot_password, forgotPasswordDto);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.TokenInjections.AUTH_MICROSERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], AuthService);
//# sourceMappingURL=auth.service.js.map