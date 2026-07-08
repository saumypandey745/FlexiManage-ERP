import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { EncryptionService } from '../services/encryption.service';
import { ConnectIntegrationDto, UpdateIntegrationDto, WebhookEndpointDto } from '../dto/integration.dto';

@Injectable()
export class IntegrationRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryption: EncryptionService
  ) {}

  async connect(tenantId: string, dto: ConnectIntegrationDto) {
    return this.prisma.$transaction(async (tx) => {
      // Create integration base
      const integration = await tx.integration.create({
        data: {
          tenantId,
          provider: dto.provider,
          category: dto.category,
          name: dto.name,
          status: 'ACTIVE',
        }
      });

      // Save encrypted credentials if provided
      if (dto.credentials) {
        for (const [key, value] of Object.entries(dto.credentials)) {
          const { encryptedValue, iv } = this.encryption.encrypt(value);
          await tx.integrationCredential.create({
            data: {
              integrationId: integration.id,
              keyName: key,
              encryptedValue,
              iv
            }
          });
        }
      }

      // Save configuration if provided
      if (dto.configuration) {
        await tx.providerConfiguration.create({
          data: {
            integrationId: integration.id,
            config: dto.configuration
          }
        });
      }

      return integration;
    });
  }

  async getIntegrations(tenantId: string) {
    return this.prisma.integration.findMany({
      where: { tenantId, deletedAt: null },
      include: { configuration: true }
    });
  }

  async getIntegration(tenantId: string, id: string) {
    const integration = await this.prisma.integration.findUnique({
      where: { id, tenantId },
      include: { configuration: true, credentials: true }
    });
    
    // Do not return raw credentials in normal gets, mapping logic handled in service if needed
    return integration;
  }

  async updateIntegration(tenantId: string, id: string, dto: UpdateIntegrationDto) {
    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.integration.update({
        where: { id, tenantId },
        data: { name: dto.name }
      });

      if (dto.configuration) {
        await tx.providerConfiguration.upsert({
          where: { integrationId: id },
          update: { config: dto.configuration },
          create: { integrationId: id, config: dto.configuration }
        });
      }

      return updated;
    });
  }

  async disconnect(tenantId: string, id: string) {
    return this.prisma.integration.update({
      where: { id, tenantId },
      data: { status: 'INACTIVE', deletedAt: new Date() }
    });
  }

  // ===================== WEBHOOKS =====================
  async createWebhookEndpoint(tenantId: string, dto: WebhookEndpointDto) {
    return this.prisma.hubWebhookEndpoint.create({
      data: {
        tenantId,
        url: dto.url,
        secret: dto.secret,
        events: dto.events
      }
    });
  }

  async getWebhookEndpoints(tenantId: string) {
    return this.prisma.hubWebhookEndpoint.findMany({
      where: { tenantId }
    });
  }

  async logAudit(integrationId: string, userId: string, action: string, details?: any) {
    return this.prisma.integrationAudit.create({
      data: {
        integrationId,
        userId,
        action,
        details: details || {}
      }
    });
  }
}
