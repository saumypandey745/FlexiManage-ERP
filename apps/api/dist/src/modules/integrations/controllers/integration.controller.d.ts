import { IntegrationService } from '../services/integration.service';
import { ConnectIntegrationDto, UpdateIntegrationDto } from '../dto/integration.dto';
export declare class IntegrationController {
    private readonly integrationService;
    constructor(integrationService: IntegrationService);
    connect(req: any, dto: ConnectIntegrationDto): Promise<{
        status: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        category: string;
        provider: string;
    }>;
    findAll(req: any): Promise<({
        configuration: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            config: import("@prisma/client/runtime/library").JsonValue;
            integrationId: string;
        } | null;
    } & {
        status: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        category: string;
        provider: string;
    })[]>;
    findOne(req: any, id: string): Promise<{
        configuration: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            config: import("@prisma/client/runtime/library").JsonValue;
            integrationId: string;
        } | null;
        status: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        category: string;
        provider: string;
    }>;
    update(req: any, id: string, dto: UpdateIntegrationDto): Promise<{
        status: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        category: string;
        provider: string;
    }>;
    remove(req: any, id: string): Promise<{
        status: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        category: string;
        provider: string;
    }>;
    sync(req: any, id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    status(req: any, id: string): Promise<{
        status: string;
    }>;
}
