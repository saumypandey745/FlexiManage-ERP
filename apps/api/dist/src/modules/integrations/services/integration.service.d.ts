import { IntegrationRepository } from '../repositories/integration.repository';
import { EncryptionService } from './encryption.service';
import { ConnectIntegrationDto, UpdateIntegrationDto } from '../dto/integration.dto';
export declare class IntegrationService {
    private readonly repo;
    private readonly encryption;
    constructor(repo: IntegrationRepository, encryption: EncryptionService);
    connect(tenantId: string, userId: string, dto: ConnectIntegrationDto): Promise<{
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
    getIntegrations(tenantId: string): Promise<({
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
    getIntegration(tenantId: string, id: string): Promise<{
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
    getDecryptedCredentials(tenantId: string, id: string): Promise<Record<string, string>>;
    updateIntegration(tenantId: string, id: string, userId: string, dto: UpdateIntegrationDto): Promise<{
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
    disconnect(tenantId: string, id: string, userId: string): Promise<{
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
    sync(tenantId: string, id: string, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
