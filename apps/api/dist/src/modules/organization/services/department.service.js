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
exports.DepartmentService = void 0;
const common_1 = require("@nestjs/common");
const organization_repository_1 = require("../organization.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let DepartmentService = class DepartmentService {
    constructor(repo, prisma) {
        this.repo = repo;
        this.prisma = prisma;
    }
    async getDepartments(tenantId) {
        return this.repo.findDepartments(tenantId);
    }
    async createDepartment(tenantId, userId, dto) {
        const department = await this.repo.createDepartment(tenantId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'CREATE',
                entityName: 'Department',
                entityId: department.id,
                newValues: dto,
            },
        });
        return department;
    }
    async updateDepartment(tenantId, departmentId, userId, dto) {
        const department = await this.repo.updateDepartment(tenantId, departmentId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'UPDATE',
                entityName: 'Department',
                entityId: department.id,
                newValues: dto,
            },
        });
        return department;
    }
    async deleteDepartment(tenantId, departmentId, userId) {
        const department = await this.repo.deleteDepartment(tenantId, departmentId);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'DELETE',
                entityName: 'Department',
                entityId: department.id,
            },
        });
        return department;
    }
};
exports.DepartmentService = DepartmentService;
exports.DepartmentService = DepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [organization_repository_1.OrganizationRepository,
        prisma_service_1.PrismaService])
], DepartmentService);
//# sourceMappingURL=department.service.js.map