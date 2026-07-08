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
var PermissionCacheService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionCacheService = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../../../common/cache/redis.service");
const rbac_repository_1 = require("../rbac.repository");
let PermissionCacheService = PermissionCacheService_1 = class PermissionCacheService {
    constructor(redis, repo) {
        this.redis = redis;
        this.repo = repo;
        this.logger = new common_1.Logger(PermissionCacheService_1.name);
        this.CACHE_TTL = 3600;
    }
    getUserCacheKey(userId) {
        return `permissions:user:${userId}`;
    }
    async getUserPermissions(userId) {
        const key = this.getUserCacheKey(userId);
        const cached = await this.redis.get(key);
        if (cached) {
            return cached;
        }
        const permissions = await this.repo.getUserPermissions(userId);
        await this.redis.set(key, permissions, this.CACHE_TTL);
        return permissions;
    }
    async invalidateUserPermissions(userId) {
        await this.redis.del(this.getUserCacheKey(userId));
        this.logger.debug(`Invalidated permission cache for user ${userId}`);
    }
    async invalidateRolePermissions(roleId, userIds) {
        for (const userId of userIds) {
            await this.invalidateUserPermissions(userId);
        }
    }
};
exports.PermissionCacheService = PermissionCacheService;
exports.PermissionCacheService = PermissionCacheService = PermissionCacheService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisCacheService,
        rbac_repository_1.RbacRepository])
], PermissionCacheService);
//# sourceMappingURL=permission-cache.service.js.map