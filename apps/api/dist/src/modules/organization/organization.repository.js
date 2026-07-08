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
exports.OrganizationRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const base_exception_1 = require("../../common/exceptions/base.exception");
let OrganizationRepository = class OrganizationRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getTenantInfo(tenantId) {
        return this.prisma.tenant.findUnique({
            where: { id: tenantId },
            include: { profile: true },
        });
    }
    async updateTenantSettings(tenantId, dto) {
        return this.prisma.tenant.update({
            where: { id: tenantId },
            data: dto,
        });
    }
    async upsertBusinessProfile(tenantId, dto) {
        return this.prisma.organizationProfile.upsert({
            where: { tenantId },
            create: { ...dto, tenantId },
            update: dto,
        });
    }
    async findBranches(tenantId) {
        return this.prisma.branch.findMany({ where: { tenantId, deletedAt: null } });
    }
    async createBranch(tenantId, dto) {
        const exists = await this.prisma.branch.findUnique({
            where: { tenantId_code: { tenantId, code: dto.code } },
        });
        if (exists && !exists.deletedAt) {
            throw new base_exception_1.BaseException('Branch code already exists', 'ORG-409', 409);
        }
        return this.prisma.branch.create({
            data: { ...dto, tenantId },
        });
    }
    async updateBranch(tenantId, branchId, dto) {
        return this.prisma.branch.update({
            where: { id: branchId, tenantId },
            data: dto,
        });
    }
    async deleteBranch(tenantId, branchId) {
        return this.prisma.branch.update({
            where: { id: branchId, tenantId },
            data: { deletedAt: new Date() },
        });
    }
    async findDepartments(tenantId) {
        return this.prisma.department.findMany({ where: { tenantId, deletedAt: null } });
    }
    async createDepartment(tenantId, dto) {
        const exists = await this.prisma.department.findUnique({
            where: { tenantId_code: { tenantId, code: dto.code } },
        });
        if (exists && !exists.deletedAt) {
            throw new base_exception_1.BaseException('Department code already exists', 'ORG-409', 409);
        }
        return this.prisma.department.create({
            data: { ...dto, tenantId },
        });
    }
    async updateDepartment(tenantId, departmentId, dto) {
        return this.prisma.department.update({
            where: { id: departmentId, tenantId },
            data: dto,
        });
    }
    async deleteDepartment(tenantId, departmentId) {
        return this.prisma.department.update({
            where: { id: departmentId, tenantId },
            data: { deletedAt: new Date() },
        });
    }
    async findTeams(tenantId) {
        return this.prisma.team.findMany({ where: { tenantId, deletedAt: null } });
    }
    async createTeam(tenantId, dto) {
        const exists = await this.prisma.team.findUnique({
            where: { tenantId_code: { tenantId, code: dto.code } },
        });
        if (exists && !exists.deletedAt) {
            throw new base_exception_1.BaseException('Team code already exists', 'ORG-409', 409);
        }
        return this.prisma.team.create({
            data: { ...dto, tenantId },
        });
    }
    async updateTeam(tenantId, teamId, dto) {
        return this.prisma.team.update({
            where: { id: teamId, tenantId },
            data: dto,
        });
    }
    async deleteTeam(tenantId, teamId) {
        return this.prisma.team.update({
            where: { id: teamId, tenantId },
            data: { deletedAt: new Date() },
        });
    }
};
exports.OrganizationRepository = OrganizationRepository;
exports.OrganizationRepository = OrganizationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrganizationRepository);
//# sourceMappingURL=organization.repository.js.map