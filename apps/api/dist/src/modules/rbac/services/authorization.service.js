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
exports.AuthorizationService = void 0;
const common_1 = require("@nestjs/common");
const permission_cache_service_1 = require("./permission-cache.service");
let AuthorizationService = class AuthorizationService {
    constructor(permissionCache) {
        this.permissionCache = permissionCache;
    }
    async hasPermission(userId, requiredPermission) {
        const permissions = await this.permissionCache.getUserPermissions(userId);
        if (permissions.includes('*') || permissions.includes('*:*')) {
            return true;
        }
        const [reqMod, reqAct] = requiredPermission.split(':');
        for (const p of permissions) {
            if (p === requiredPermission)
                return true;
            const [mod, act] = p.split(':');
            if (mod === reqMod && act === '*')
                return true;
        }
        return false;
    }
    async hasAllPermissions(userId, requiredPermissions) {
        for (const req of requiredPermissions) {
            const has = await this.hasPermission(userId, req);
            if (!has)
                return false;
        }
        return true;
    }
    async hasAnyPermission(userId, requiredPermissions) {
        for (const req of requiredPermissions) {
            const has = await this.hasPermission(userId, req);
            if (has)
                return true;
        }
        return false;
    }
    async authorize(userId, requiredPermission) {
        const has = await this.hasPermission(userId, requiredPermission);
        if (!has) {
            throw new common_1.ForbiddenException(`Missing required permission: ${requiredPermission}`);
        }
    }
};
exports.AuthorizationService = AuthorizationService;
exports.AuthorizationService = AuthorizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [permission_cache_service_1.PermissionCacheService])
], AuthorizationService);
//# sourceMappingURL=authorization.service.js.map