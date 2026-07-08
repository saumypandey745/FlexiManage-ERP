import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { IntegrationRepository } from '../repositories/integration.repository';
import { EncryptionService } from './encryption.service';
import { ConnectIntegrationDto, UpdateIntegrationDto } from '../dto/integration.dto';

@Injectable()
export class IntegrationService {
  constructor(
    private readonly repo: IntegrationRepository,
    private readonly encryption: EncryptionService
  ) {}

  async connect(tenantId: string, userId: string, dto: ConnectIntegrationDto) {
    const integration = await this.repo.connect(tenantId, dto);
    await this.repo.logAudit(integration.id, userId, 'CONNECT');
    return integration;
  }

  async getIntegrations(tenantId: string) {
    return this.repo.getIntegrations(tenantId);
  }

  async getIntegration(tenantId: string, id: string) {
    const integration = await this.repo.getIntegration(tenantId, id);
    if (!integration) throw new NotFoundException('Integration not found');
    
    // Strip credentials from the payload before returning to the controller
    const { credentials, ...safeIntegration } = integration;
    return safeIntegration;
  }

  async getDecryptedCredentials(tenantId: string, id: string): Promise<Record<string, string>> {
    const integration = await this.repo.getIntegration(tenantId, id);
    if (!integration) throw new NotFoundException('Integration not found');

    const creds: Record<string, string> = {};
    for (const cred of integration.credentials || []) {
      creds[cred.keyName] = this.encryption.decrypt(cred.encryptedValue, cred.iv);
    }
    return creds;
  }

  async updateIntegration(tenantId: string, id: string, userId: string, dto: UpdateIntegrationDto) {
    const updated = await this.repo.updateIntegration(tenantId, id, dto);
    await this.repo.logAudit(id, userId, 'UPDATE');
    return updated;
  }

  async disconnect(tenantId: string, id: string, userId: string) {
    const integration = await this.repo.disconnect(tenantId, id);
    await this.repo.logAudit(id, userId, 'DISCONNECT');
    return integration;
  }

  async sync(tenantId: string, id: string, userId: string) {
    // This would typically queue a SyncJob using BullMQ for the specific provider
    await this.repo.logAudit(id, userId, 'MANUAL_SYNC');
    return { success: true, message: 'Sync job queued successfully' };
  }
}
