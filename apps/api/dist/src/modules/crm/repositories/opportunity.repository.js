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
exports.OpportunityRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let OpportunityRepository = class OpportunityRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOpportunities(tenantId) {
        return this.prisma.opportunity.findMany({
            where: { tenantId, deletedAt: null },
            orderBy: { createdAt: 'desc' },
            include: { customer: true, assignedTo: true },
        });
    }
    async findById(tenantId, id) {
        const opp = await this.prisma.opportunity.findUnique({
            where: { id },
            include: { customer: true, assignedTo: true, history: true },
        });
        if (!opp || opp.tenantId !== tenantId || opp.deletedAt)
            return null;
        return opp;
    }
    async createOpportunity(tenantId, dto, actionUserId) {
        const opp = await this.prisma.opportunity.create({
            data: { ...dto, tenantId },
        });
        await this.prisma.opportunityHistory.create({
            data: {
                opportunityId: opp.id,
                newStage: opp.stage,
                changedById: actionUserId,
            },
        });
        return opp;
    }
    async updateOpportunity(tenantId, id, dto, actionUserId) {
        const existing = await this.findById(tenantId, id);
        if (!existing)
            throw new Error('Not found');
        const updated = await this.prisma.opportunity.update({
            where: { id, tenantId },
            data: dto,
        });
        if (dto.stage && dto.stage !== existing.stage) {
            await this.prisma.opportunityHistory.create({
                data: {
                    opportunityId: id,
                    oldStage: existing.stage,
                    newStage: dto.stage,
                    changedById: actionUserId,
                },
            });
        }
        return updated;
    }
    async updateStage(tenantId, id, stage, actionUserId) {
        return this.updateOpportunity(tenantId, id, { stage }, actionUserId);
    }
};
exports.OpportunityRepository = OpportunityRepository;
exports.OpportunityRepository = OpportunityRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OpportunityRepository);
//# sourceMappingURL=opportunity.repository.js.map