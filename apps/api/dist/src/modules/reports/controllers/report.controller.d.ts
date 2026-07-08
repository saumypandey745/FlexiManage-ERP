import { ReportService } from '../services/report.service';
import { CreateReportDto, UpdateReportDto, GenerateReportDto } from '../dto/report.dto';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    create(req: any, dto: CreateReportDto): Promise<{
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
    findAll(req: any, page?: number, limit?: number): Promise<{
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
    findOne(req: any, id: string): Promise<{
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
    update(req: any, id: string, dto: UpdateReportDto, version: string): Promise<{
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
    remove(req: any, id: string): Promise<{
        success: boolean;
    }>;
    generate(req: any, id: string, dto: GenerateReportDto): Promise<{
        executionId: string;
        status: string;
    }>;
}
