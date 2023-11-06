"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
class ForbiddenException extends common_1.HttpException {
    constructor(message, code) {
        super({
            message: message || constants_1.ExceptionTitleList.Forbidden,
            code: code || constants_1.StatusCodesList.Forbidden,
            statusCode: common_1.HttpStatus.FORBIDDEN,
            error: true,
        }, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.ForbiddenException = ForbiddenException;
//# sourceMappingURL=forbidden.exception.js.map