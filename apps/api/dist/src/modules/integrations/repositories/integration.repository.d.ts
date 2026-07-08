import { PrismaService } from '../../../common/prisma/prisma.service';
import { EncryptionService } from '../services/encryption.service';
import { ConnectIntegrationDto, UpdateIntegrationDto, WebhookEndpointDto } from '../dto/integration.dto';
export declare class IntegrationRepository {
    private readonly prisma;
    private readonly encryption;
    constructor(prisma: PrismaService, encryption: EncryptionService);
    connect(tenantId: string, dto: ConnectIntegrationDto): Promise<{
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
    getIntegration(tenantId: string, id: string): Promise<({
        credentials: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            expiresAt: Date | null;
            integrationId: string;
            encryptedValue: string;
            iv: string;
            keyName: string;
        }[];
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
    }) | null>;
    updateIntegration(tenantId: string, id: string, dto: UpdateIntegrationDto): Promise<{
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
    disconnect(tenantId: string, id: string): Promise<{
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
    createWebhookEndpoint(tenantId: string, dto: WebhookEndpointDto): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        secret: string | null;
        url: string;
        events: string[];
        isActive: boolean;
    }>;
    getWebhookEndpoints(tenantId: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        secret: string | null;
        url: string;
        events: string[];
        isActive: boolean;
    }[]>;
    logAudit(integrationId: string, userId: string, action: string, details?: any): Promise<{
        id: string;
        createdAt: Date;
        userId: string | null;
        action: string;
        details: import("@prisma/client/runtime/library").JsonValue | null;
        integrationId: string;
    }>;
}
