"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuditInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let AuditInterceptor = AuditInterceptor_1 = class AuditInterceptor {
    constructor() {
        this.logger = new common_1.Logger(AuditInterceptor_1.name);
    }
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const method = request.method;
        const isMutating = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);
        if (!isMutating) {
            return next.handle();
        }
        const userId = request['user']?.id || 'SYSTEM';
        const tenantId = request['user']?.tenantId || 'GLOBAL';
        const traceId = request.headers['x-trace-id'] || 'N/A';
        const url = request.url;
        return next.handle().pipe((0, operators_1.tap)(() => {
            const statusCode = response.statusCode;
            this.logger.log(`[AUDIT] User:${userId} | Tenant:${tenantId} | Action:${method} ${url} | Status:${statusCode} | TraceId:${traceId}`);
        }));
    }
};
exports.AuditInterceptor = AuditInterceptor;
exports.AuditInterceptor = AuditInterceptor = AuditInterceptor_1 = __decorate([
    (0, common_1.Injectable)()
], AuditInterceptor);
//# sourceMappingURL=audit.interceptor.js.map