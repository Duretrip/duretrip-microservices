"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictException = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
class ConflictException extends common_1.HttpException {
    constructor(message, code) {
        super({
            message: message || constants_1.ExceptionTitleList.Conflict,
            code: code || constants_1.StatusCodesList.Coflict,
            statusCode: common_1.HttpStatus.CONFLICT,
            error: true,
        }, common_1.HttpStatus.CONFLICT);
    }
}
exports.ConflictException = ConflictException;
//# sourceMappingURL=conflict.exception.js.map