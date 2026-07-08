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
exports.OpportunityService = void 0;
const common_1 = require("@nestjs/common");
const opportunity_repository_1 = require("../repositories/opportunity.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let OpportunityService = class OpportunityService {
    constructor(repo, prisma) {
        this.repo = repo;
        this.prisma = prisma;
    }
    async getOpportunities(tenantId) {
        return this.repo.findOpportunities(tenantId);
    }
    async getOpportunityById(tenantId, id) {
        return this.repo.findById(tenantId, id);
    }
    async createOpportunity(tenantId, actionUserId, dto) {
        const opp = await this.repo.createOpportunity(tenantId, dto, actionUserId);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'CREATE',
                entityName: 'Opportunity',
                entityId: opp.id,
                newValues: dto,
            },
        });
        return opp;
    }
    async updateOpportunity(tenantId, id, actionUserId, dto) {
        const opp = await this.repo.updateOpportunity(tenantId, id, dto, actionUserId);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'UPDATE',
                entityName: 'Opportunity',
                entityId: opp.id,
                newValues: dto,
            },
        });
        return opp;
    }
    async setStage(tenantId, id, actionUserId, stage) {
        return this.repo.updateStage(tenantId, id, stage, actionUserId);
    }
};
exports.OpportunityService = OpportunityService;
exports.OpportunityService = OpportunityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [opportunity_repository_1.OpportunityRepository,
        prisma_service_1.PrismaService])
], OpportunityService);
//# sourceMappingURL=opportunity.service.js.map