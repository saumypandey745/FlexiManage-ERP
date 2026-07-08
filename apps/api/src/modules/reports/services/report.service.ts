import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportRepository } from '../repositories/report.repository';
import { CreateReportDto, UpdateReportDto, GenerateReportDto } from '../dto/report.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(tenantId: string, userId: string, dto: CreateReportDto) {
    const report = await this.reportRepository.create(tenantId, userId, dto);
    
    // Log audit
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

  async findAll(tenantId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.reportRepository.findMany(tenantId, { skip, take: limit });
    return { data, total, page, limit };
  }

  async findOne(tenantId: string, id: string) {
    const report = await this.reportRepository.findById(tenantId, id);
    if (!report) throw new NotFoundException('Report not found');
    return report;
  }

  async update(tenantId: string, id: string, dto: UpdateReportDto, currentVersion: number, userId: string) {
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

  async delete(tenantId: string, id: string, userId: string) {
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

  async generate(tenantId: string, id: string, userId: string, dto: GenerateReportDto) {
    const report = await this.findOne(tenantId, id);
    
    const execution = await this.reportRepository.createExecution(tenantId, {
      tenant: { connect: { id: tenantId } },
      report: { connect: { id: report.id } },
      executedBy: userId,
      status: 'PENDING'
    });

    // TODO: Publish BullMQ Job to GenerateReportJob worker
    // It will process the queryConfig, run raw SQL/Prisma aggregations, and return JSON.

    return { executionId: execution.id, status: 'PROCESSING' };
  }
}
