import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { Prisma, Report } from "@prisma/client";
import { CreateReportDto, UpdateReportDto } from "../dto/report.dto";

@Injectable()
export class ReportRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    tenantId: string,
    userId: string,
    dto: CreateReportDto
  ): Promise<Report> {
    return this.prisma.report.create({
      data: {
        tenantId,
        createdBy: userId,
        name: dto.name,
        description: dto.description,
        type: dto.type,
        queryConfig: dto.queryConfig || {},
        columns: dto.columns || {},
      },
    });
  }

  async findMany(
    tenantId: string,
    params: { skip?: number; take?: number; where?: Prisma.ReportWhereInput }
  ): Promise<[Report[], number]> {
    const { skip, take, where } = params;
    return Promise.all([
      this.prisma.report.findMany({
        skip,
        take,
        where: { ...where, tenantId, deletedAt: null },
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.report.count({
        where: { ...where, tenantId, deletedAt: null },
      }),
    ]);
  }

  async findById(tenantId: string, id: string): Promise<Report | null> {
    return this.prisma.report.findUnique({
      where: { id, tenantId },
    });
  }

  async update(
    tenantId: string,
    id: string,
    dto: UpdateReportDto,
    currentVersion: number
  ): Promise<Report> {
    return this.prisma.report.update({
      where: { id, tenantId, version: currentVersion },
      data: {
        ...dto,
        version: { increment: 1 },
      },
    });
  }

  async softDelete(tenantId: string, id: string): Promise<Report> {
    return this.prisma.report.update({
      where: { id, tenantId },
      data: { deletedAt: new Date() },
    });
  }

  async createExecution(
    tenantId: string,
    data: Prisma.ReportExecutionCreateInput
  ) {
    return this.prisma.reportExecution.create({ data });
  }

  async updateExecution(
    tenantId: string,
    id: string,
    data: Prisma.ReportExecutionUpdateInput
  ) {
    return this.prisma.reportExecution.update({
      where: { id, tenantId },
      data,
    });
  }
}
