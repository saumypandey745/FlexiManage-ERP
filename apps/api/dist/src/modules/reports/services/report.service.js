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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const report_repository_1 = require("../repositories/report.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let ReportService = class ReportService {
    constructor(reportRepository, prisma) {
        this.reportRepository = reportRepository;
        this.prisma = prisma;
    }
    async create(tenantId, userId, dto) {
        const report = await this.reportRepository.create(tenantId, userId, dto);
        await this.prisma.reportAudit.create({
            data: {
                tenantId,
                reportId: report.id,
                userId,
                action: 'CREATED'
            }
        });
        return report;
    }
    async findAll(tenantId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.reportRepository.findMany(tenantId, { skip, take: limit });
        return { data, total, page, limit };
    }
    async findOne(tenantId, id) {
        const report = await this.reportRepository.findById(tenantId, id);
        if (!report)
            throw new common_1.NotFoundException('Report not found');
        return report;
    }
    async update(tenantId, id, dto, currentVersion, userId) {
        const report = await this.reportRepository.update(tenantId, id, dto, currentVersion);
        await this.prisma.reportAudit.create({
            data: {
                tenantId,
                reportId: report.id,
                userId,
                action: 'MODIFIED'
            }
        });
        return report;
    }
    async delete(tenantId, id, userId) {
        const report = await this.reportRepository.softDelete(tenantId, id);
        await this.prisma.reportAudit.create({
            data: {
                tenantId,
                reportId: report.id,
                userId,
                action: 'DELETED'
            }
        });
        return { success: true };
    }
    async generate(tenantId, id, userId, dto) {
        const report = await this.findOne(tenantId, id);
        const execution = await this.reportRepository.createExecution(tenantId, {
            tenant: { connect: { id: tenantId } },
            report: { connect: { id: report.id } },
            executedBy: userId,
            status: 'PENDING'
        });
        return { executionId: execution.id, status: 'PROCESSING' };
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [report_repository_1.ReportRepository,
        prisma_service_1.PrismaService])
], ReportService);
//# sourceMappingURL=report.service.js.map