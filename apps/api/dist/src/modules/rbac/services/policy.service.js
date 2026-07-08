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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyService = void 0;
const common_1 = require("@nestjs/common");
const authorization_service_1 = require("./authorization.service");
let PolicyService = class PolicyService {
    constructor(auth) {
        this.auth = auth;
    }
    async evaluateTenantAccess(userId, userTenantId, resourceTenantId) {
        if (await this.auth.hasPermission(userId, 'system:admin')) {
            return true;
        }
        return userTenantId === resourceTenantId;
    }
    async canEditEmployee(userId, targetUserId) {
        if (userId === targetUserId) {
            return true;
        }
        return this.auth.hasPermission(userId, 'employee:update');
    }
};
exports.PolicyService = PolicyService;
exports.PolicyService = PolicyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [authorization_service_1.AuthorizationService])
], PolicyService);
//# sourceMappingURL=policy.service.js.map