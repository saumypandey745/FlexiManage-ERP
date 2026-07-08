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
exports.RbacRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const base_exception_1 = require("../../common/exceptions/base.exception");
let RbacRepository = class RbacRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getRoles(tenantId) {
        return this.prisma.role.findMany({
            where: {
                OR: [{ tenantId }, { tenantId: null }],
            },
            include: { permissions: { include: { permission: true } } },
        });
    }
    async createRole(tenantId, dto) {
        const exists = await this.prisma.role.findFirst({
            where: {
                name: dto.name,
                OR: [{ tenantId }, { tenantId: null }],
            },
        });
        if (exists) {
            throw new base_exception_1.BaseException(`Role ${dto.name} already exists`, 'RBAC-409', 409);
        }
        return this.prisma.role.create({
            data: { name: dto.name, tenantId },
        });
    }
    async updateRole(tenantId, roleId, dto) {
        return this.prisma.role.update({
            where: { id: roleId, tenantId },
            data: dto,
        });
    }
    async deleteRole(tenantId, roleId) {
        return this.prisma.role.delete({
            where: { id: roleId, tenantId },
        });
    }
    async getPermissions() {
        return this.prisma.permission.findMany();
    }
    async createPermission(dto) {
        return this.prisma.permission.upsert({
            where: { action: dto.action },
            create: { action: dto.action },
            update: {},
        });
    }
    async updatePermission(permissionId, dto) {
        return this.prisma.permission.update({
            where: { id: permissionId },
            data: { action: dto.action },
        });
    }
    async deletePermission(permissionId) {
        return this.prisma.permission.delete({
            where: { id: permissionId },
        });
    }
    async assignPermissionToRole(roleId, permissionId) {
        return this.prisma.rolePermission.upsert({
            where: { roleId_permissionId: { roleId, permissionId } },
            create: { roleId, permissionId },
            update: {},
        });
    }
    async removePermissionFromRole(roleId, permissionId) {
        return this.prisma.rolePermission.delete({
            where: { roleId_permissionId: { roleId, permissionId } },
        });
    }
    async assignRoleToUser(userId, roleId) {
        return this.prisma.userRole.upsert({
            where: { userId_roleId: { userId, roleId } },
            create: { userId, roleId },
            update: {},
        });
    }
    async removeRoleFromUser(userId, roleId) {
        return this.prisma.userRole.delete({
            where: { userId_roleId: { userId, roleId } },
        });
    }
    async getUserPermissions(userId) {
        const userRoles = await this.prisma.userRole.findMany({
            where: { userId },
            include: {
                role: {
                    include: {
                        permissions: {
                            include: { permission: true },
                        },
                    },
                },
            },
        });
        const actions = new Set();
        for (const ur of userRoles) {
            for (const rp of ur.role.permissions) {
                actions.add(rp.permission.action);
            }
        }
        return Array.from(actions);
    }
};
exports.RbacRepository = RbacRepository;
exports.RbacRepository = RbacRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RbacRepository);
//# sourceMappingURL=rbac.repository.js.map