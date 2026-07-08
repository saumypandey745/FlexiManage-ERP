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
exports.RbacService = void 0;
const common_1 = require("@nestjs/common");
const rbac_repository_1 = require("./rbac.repository");
const permission_cache_service_1 = require("./services/permission-cache.service");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let RbacService = class RbacService {
    constructor(repo, cache, prisma) {
        this.repo = repo;
        this.cache = cache;
        this.prisma = prisma;
    }
    async assignPermissionToRole(tenantId, userId, roleId, permissionId) {
        const rp = await this.repo.assignPermissionToRole(roleId, permissionId);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'CREATE',
                entityName: 'RolePermission',
                entityId: `${roleId}-${permissionId}`,
            },
        });
        const userRoles = await this.prisma.userRole.findMany({ where: { roleId }, select: { userId: true } });
        await this.cache.invalidateRolePermissions(roleId, userRoles.map(ur => ur.userId));
        return rp;
    }
    async removePermissionFromRole(tenantId, userId, roleId, permissionId) {
        const rp = await this.repo.removePermissionFromRole(roleId, permissionId);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'DELETE',
                entityName: 'RolePermission',
                entityId: `${roleId}-${permissionId}`,
            },
        });
        const userRoles = await this.prisma.userRole.findMany({ where: { roleId }, select: { userId: true } });
        await this.cache.invalidateRolePermissions(roleId, userRoles.map(ur => ur.userId));
        return rp;
    }
    async assignRoleToUser(tenantId, actionUserId, targetUserId, roleId) {
        const ur = await this.repo.assignRoleToUser(targetUserId, roleId);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'CREATE',
                entityName: 'UserRole',
                entityId: `${targetUserId}-${roleId}`,
            },
        });
        await this.cache.invalidateUserPermissions(targetUserId);
        return ur;
    }
    async removeRoleFromUser(tenantId, actionUserId, targetUserId, roleId) {
        const ur = await this.repo.removeRoleFromUser(targetUserId, roleId);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'DELETE',
                entityName: 'UserRole',
                entityId: `${targetUserId}-${roleId}`,
            },
        });
        await this.cache.invalidateUserPermissions(targetUserId);
        return ur;
    }
};
exports.RbacService = RbacService;
exports.RbacService = RbacService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rbac_repository_1.RbacRepository,
        permission_cache_service_1.PermissionCacheService,
        prisma_service_1.PrismaService])
], RbacService);
//# sourceMappingURL=rbac.service.js.map