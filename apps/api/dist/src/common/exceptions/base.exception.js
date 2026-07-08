"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantIsolationException = exports.BaseException = void 0;
const common_1 = require("@nestjs/common");
class BaseException extends common_1.HttpException {
    constructor(message, code, status = common_1.HttpStatus.BAD_REQUEST) {
        super(message, status);
        this.message = message;
        this.code = code;
    }
    getCode() {
        return this.code;
    }
}
exports.BaseException = BaseException;
class TenantIsolationException extends BaseException {
    constructor() {
        super('Tenant isolation violation detected.', 'SEC-403', common_1.HttpStatus.FORBIDDEN);
    }
}
exports.TenantIsolationException = TenantIsolationException;
//# sourceMappingURL=base.exception.js.map