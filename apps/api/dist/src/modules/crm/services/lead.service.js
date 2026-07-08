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
exports.LeadService = void 0;
const common_1 = require("@nestjs/common");
const lead_repository_1 = require("../repositories/lead.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let LeadService = class LeadService {
    constructor(repo, prisma) {
        this.repo = repo;
        this.prisma = prisma;
    }
    async getLeads(tenantId) {
        return this.repo.findLeads(tenantId);
    }
    async getLeadById(tenantId, id) {
        return this.repo.findById(tenantId, id);
    }
    async createLead(tenantId, actionUserId, dto) {
        const lead = await this.repo.createLead(tenantId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'CREATE',
                entityName: 'Lead',
                entityId: lead.id,
                newValues: dto,
            },
        });
        return lead;
    }
    async updateLead(tenantId, id, actionUserId, dto) {
        const lead = await this.repo.updateLead(tenantId, id, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'UPDATE',
                entityName: 'Lead',
                entityId: lead.id,
                newValues: dto,
            },
        });
        return lead;
    }
    async deleteLead(tenantId, id, actionUserId) {
        const lead = await this.repo.deleteLead(tenantId, id);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'DELETE',
                entityName: 'Lead',
                entityId: lead.id,
            },
        });
        return lead;
    }
};
exports.LeadService = LeadService;
exports.LeadService = LeadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lead_repository_1.LeadRepository,
        prisma_service_1.PrismaService])
], LeadService);
//# sourceMappingURL=lead.service.js.map