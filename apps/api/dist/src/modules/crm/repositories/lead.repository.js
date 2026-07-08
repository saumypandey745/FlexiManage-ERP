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
exports.LeadRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const client_1 = require("@prisma/client");
const base_exception_1 = require("../../../common/exceptions/base.exception");
let LeadRepository = class LeadRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findLeads(tenantId) {
        return this.prisma.lead.findMany({
            where: { tenantId, deletedAt: null },
            orderBy: { createdAt: 'desc' },
            include: { assignedTo: true, activities: true, notes: true },
        });
    }
    async findById(tenantId, id) {
        const lead = await this.prisma.lead.findUnique({
            where: { id },
            include: { assignedTo: true, activities: true, notes: true },
        });
        if (!lead || lead.tenantId !== tenantId || lead.deletedAt)
            return null;
        return lead;
    }
    async createLead(tenantId, dto) {
        const existing = await this.prisma.lead.findFirst({
            where: { tenantId, email: dto.email, deletedAt: null },
        });
        if (existing) {
            throw new base_exception_1.BaseException('Lead with this email already exists', 'CRM-LEAD-409', 409);
        }
        return this.prisma.lead.create({
            data: { ...dto, tenantId },
        });
    }
    async updateLead(tenantId, id, dto) {
        return this.prisma.lead.update({
            where: { id, tenantId },
            data: dto,
        });
    }
    async deleteLead(tenantId, id) {
        return this.prisma.lead.update({
            where: { id, tenantId },
            data: { deletedAt: new Date(), status: client_1.LeadStatus.ARCHIVED },
        });
    }
    async updateStatus(tenantId, id, status) {
        return this.prisma.lead.update({
            where: { id, tenantId },
            data: { status },
        });
    }
};
exports.LeadRepository = LeadRepository;
exports.LeadRepository = LeadRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeadRepository);
//# sourceMappingURL=lead.repository.js.map