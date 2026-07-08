import { PrismaService } from '../../../common/prisma/prisma.service';
import { Prisma, Report } from '@prisma/client';
import { CreateReportDto, UpdateReportDto } from '../dto/report.dto';
export declare class ReportRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(tenantId: string, userId: string, dto: CreateReportDto): Promise<Report>;
    findMany(tenantId: string, params: {
        skip?: number;
        take?: number;
        where?: Prisma.ReportWhereInput;
    }): Promise<[Report[], number]>;
    findById(tenantId: string, id: string): Promise<Report | null>;
    update(tenantId: string, id: string, dto: UpdateReportDto, currentVersion: number): Promise<Report>;
    softDelete(tenantId: string, id: string): Promise<Report>;
    createExecution(tenantId: string, data: Prisma.ReportExecutionCreateInput): Promise<{
        status: string;
        id: string;
        tenantId: string;
        completedAt: Date | null;
        executedBy: string | null;
        durationMs: number | null;
        rowsReturned: number | null;
        errorMessage: string | null;
        startedAt: Date;
        reportId: string;
    }>;
    updateExecution(tenantId: string, id: string, data: Prisma.ReportExecutionUpdateInput): Promise<{
        status: string;
        id: string;
        tenantId: string;
        completedAt: Date | null;
        executedBy: string | null;
        durationMs: number | null;
        rowsReturned: number | null;
        errorMessage: string | null;
        startedAt: Date;
        reportId: string;
    }>;
}
