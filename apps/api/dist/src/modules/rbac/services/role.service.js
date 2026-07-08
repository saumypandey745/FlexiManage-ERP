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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const rbac_repository_1 = require("../rbac.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let RoleService = class RoleService {
    constructor(repo, prisma) {
        this.repo = repo;
        this.prisma = prisma;
    }
    async getRoles(tenantId) {
        return this.repo.getRoles(tenantId);
    }
    async createRole(tenantId, userId, dto) {
        const role = await this.repo.createRole(tenantId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'CREATE',
                entityName: 'Role',
                entityId: role.id,
                newValues: dto,
            },
        });
        return role;
    }
    async updateRole(tenantId, roleId, userId, dto) {
        const role = await this.repo.updateRole(tenantId, roleId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'UPDATE',
                entityName: 'Role',
                entityId: role.id,
                newValues: dto,
            },
        });
        return role;
    }
    async deleteRole(tenantId, roleId, userId) {
        const role = await this.repo.deleteRole(tenantId, roleId);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'DELETE',
                entityName: 'Role',
                entityId: role.id,
            },
        });
        return role;
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rbac_repository_1.RbacRepository,
        prisma_service_1.PrismaService])
], RoleService);
//# sourceMappingURL=role.service.js.map