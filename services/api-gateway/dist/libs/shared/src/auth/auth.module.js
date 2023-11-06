"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const rmq_module_1 = require("../rmq/rmq.module");
const services_1 = require("./services");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer.apply(cookieParser()).forRoutes('*');
    }
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [rmq_module_1.RmqModule.register({ name: services_1.AUTH_SERVICE })],
        exports: [rmq_module_1.RmqModule],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map