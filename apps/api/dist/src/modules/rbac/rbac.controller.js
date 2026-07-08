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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RbacController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const tenant_guard_1 = require("../../common/guards/tenant.guard");
const auth_decorators_1 = require("../../common/decorators/auth.decorators");
const role_service_1 = require("./services/role.service");
const permission_service_1 = require("./services/permission.service");
const rbac_service_1 = require("./rbac.service");
const permission_cache_service_1 = require("./services/permission-cache.service");
const role_dto_1 = require("./dto/role.dto");
const permission_dto_1 = require("./dto/permission.dto");
let RbacController = class RbacController {
    constructor(roleService, permissionService, rbacService, cache) {
        this.roleService = roleService;
        this.permissionService = permissionService;
        this.rbacService = rbacService;
        this.cache = cache;
    }
    async getRoles(user) {
        return this.roleService.getRoles(user.tenantId);
    }
    async createRole(user, dto) {
        return this.roleService.createRole(user.tenantId, user.id, dto);
    }
    async updateRole(user, id, dto) {
        return this.roleService.updateRole(user.tenantId, id, user.id, dto);
    }
    async deleteRole(user, id) {
        return this.roleService.deleteRole(user.tenantId, id, user.id);
    }
    async getPermissions() {
        return this.permissionService.getPermissions();
    }
    async createPermission(dto) {
        return this.permissionService.createPermission(dto);
    }
    async updatePermission(id, dto) {
        return this.permissionService.updatePermission(id, dto);
    }
    async deletePermission(id) {
        return this.permissionService.deletePermission(id);
    }
    async assignPermissionToRole(user, roleId, permissionId) {
        return this.rbacService.assignPermissionToRole(user.tenantId, user.id, roleId, permissionId);
    }
    async removePermissionFromRole(user, roleId, permissionId) {
        return this.rbacService.removePermissionFromRole(user.tenantId, user.id, roleId, permissionId);
    }
    async assignRoleToUser(user, targetUserId, roleId) {
        return this.rbacService.assignRoleToUser(user.tenantId, user.id, targetUserId, roleId);
    }
    async removeRoleFromUser(user, targetUserId, roleId) {
        return this.rbacService.removeRoleFromUser(user.tenantId, user.id, targetUserId, roleId);
    }
    async getMyPermissions(user) {
        return this.cache.getUserPermissions(user.id);
    }
};
exports.RbacController = RbacController;
__decorate([
    (0, common_1.Get)('roles'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Roles' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "getRoles", null);
__decorate([
    (0, common_1.Post)('roles'),
    (0, swagger_1.ApiOperation)({ summary: 'Create Role' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "createRole", null);
__decorate([
    (0, common_1.Patch)('roles/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Role' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, role_dto_1.UpdateRoleDto]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Delete)('roles/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Role' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "deleteRole", null);
__decorate([
    (0, common_1.Get)('permissions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get System Permissions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "getPermissions", null);
__decorate([
    (0, common_1.Post)('permissions'),
    (0, swagger_1.ApiOperation)({ summary: 'Create Permission (SuperAdmin Only)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permission_dto_1.CreatePermissionDto]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "createPermission", null);
__decorate([
    (0, common_1.Patch)('permissions/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Permission (SuperAdmin Only)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, permission_dto_1.UpdatePermissionDto]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "updatePermission", null);
__decorate([
    (0, common_1.Delete)('permissions/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Permission (SuperAdmin Only)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "deletePermission", null);
__decorate([
    (0, common_1.Post)('roles/:id/permissions'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign Permission to Role' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('permissionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "assignPermissionToRole", null);
__decorate([
    (0, common_1.Delete)('roles/:id/permissions/:permissionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove Permission from Role' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('permissionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "removePermissionFromRole", null);
__decorate([
    (0, common_1.Post)('users/:userId/roles'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign Role to User' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)('roleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "assignRoleToUser", null);
__decorate([
    (0, common_1.Delete)('users/:userId/roles/:roleId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove Role from User' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Param)('roleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "removeRoleFromUser", null);
__decorate([
    (0, common_1.Get)('me/permissions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get My Resolved Permissions' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "getMyPermissions", null);
exports.RbacController = RbacController = __decorate([
    (0, swagger_1.ApiTags)('RBAC'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, tenant_guard_1.TenantGuard),
    (0, common_1.Controller)('rbac'),
    __metadata("design:paramtypes", [role_service_1.RoleService,
        permission_service_1.PermissionService,
        rbac_service_1.RbacService,
        permission_cache_service_1.PermissionCacheService])
], RbacController);
//# sourceMappingURL=rbac.controller.js.map