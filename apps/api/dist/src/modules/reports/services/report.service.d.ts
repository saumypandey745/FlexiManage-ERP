import { ReportRepository } from '../repositories/report.repository';
import { CreateReportDto, UpdateReportDto, GenerateReportDto } from '../dto/report.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class ReportService {
    private readonly reportRepository;
    private readonly prisma;
    constructor(reportRepository: ReportRepository, prisma: PrismaService);
    create(tenantId: string, userId: string, dto: CreateReportDto): Promise<{
        type: import(".prisma/client").$Enums.ReportType;
        status: import(".prisma/client").$Enums.ReportStatus;
        description: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        version: number;
        createdBy: string;
        queryConfig: import("@prisma/client/runtime/library").JsonValue;
        columns: import("@prisma/client/runtime/library").JsonValue;
    }>;
    findAll(tenantId: string, page?: number, limit?: number): Promise<{
        data: {
            type: import(".prisma/client").$Enums.ReportType;
            status: import(".prisma/client").$Enums.ReportStatus;
            description: string | null;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            version: number;
            createdBy: string;
            queryConfig: import("@prisma/client/runtime/library").JsonValue;
            columns: import("@prisma/client/runtime/library").JsonValue;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(tenantId: string, id: string): Promise<{
        type: import(".prisma/client").$Enums.ReportType;
        status: import(".prisma/client").$Enums.ReportStatus;
        description: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        version: number;
        createdBy: string;
        queryConfig: import("@prisma/client/runtime/library").JsonValue;
        columns: import("@prisma/client/runtime/library").JsonValue;
    }>;
    update(tenantId: string, id: string, dto: UpdateReportDto, currentVersion: number, userId: string): Promise<{
        type: import(".prisma/client").$Enums.ReportType;
        status: import(".prisma/client").$Enums.ReportStatus;
        description: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        version: number;
        createdBy: string;
        queryConfig: import("@prisma/client/runtime/library").JsonValue;
        columns: import("@prisma/client/runtime/library").JsonValue;
    }>;
    delete(tenantId: string, id: string, userId: string): Promise<{
        success: boolean;
    }>;
    generate(tenantId: string, id: string, userId: string, dto: GenerateReportDto): Promise<{
        executionId: string;
        status: string;
    }>;
}
