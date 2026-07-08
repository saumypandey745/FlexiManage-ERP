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
exports.BranchService = void 0;
const common_1 = require("@nestjs/common");
const organization_repository_1 = require("../organization.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let BranchService = class BranchService {
    constructor(repo, prisma) {
        this.repo = repo;
        this.prisma = prisma;
    }
    async getBranches(tenantId) {
        return this.repo.findBranches(tenantId);
    }
    async createBranch(tenantId, userId, dto) {
        const branch = await this.repo.createBranch(tenantId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'CREATE',
                entityName: 'Branch',
                entityId: branch.id,
                newValues: dto,
            },
        });
        return branch;
    }
    async updateBranch(tenantId, branchId, userId, dto) {
        const branch = await this.repo.updateBranch(tenantId, branchId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'UPDATE',
                entityName: 'Branch',
                entityId: branch.id,
                newValues: dto,
            },
        });
        return branch;
    }
    async deleteBranch(tenantId, branchId, userId) {
        const branch = await this.repo.deleteBranch(tenantId, branchId);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'DELETE',
                entityName: 'Branch',
                entityId: branch.id,
            },
        });
        return branch;
    }
};
exports.BranchService = BranchService;
exports.BranchService = BranchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [organization_repository_1.OrganizationRepository,
        prisma_service_1.PrismaService])
], BranchService);
//# sourceMappingURL=branch.service.js.map