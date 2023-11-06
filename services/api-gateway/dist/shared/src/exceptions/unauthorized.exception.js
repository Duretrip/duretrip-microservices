"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
class UnauthorizedException extends common_1.HttpException {
    constructor(message, code) {
        super({
            message: message || constants_1.ExceptionTitleList.Unauthorized,
            code: code || constants_1.StatusCodesList.UnauthorizedAccess,
            statusCode: common_1.HttpStatus.UNAUTHORIZED,
            error: true,
        }, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.UnauthorizedException = UnauthorizedException;
//# sourceMappingURL=unauthorized.exception.js.map