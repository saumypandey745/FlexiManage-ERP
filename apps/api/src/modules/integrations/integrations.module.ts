import { Module } from '@nestjs/common';
import { IntegrationController } from './controllers/integration.controller';
import { WebhookController } from './controllers/webhook.controller';
import { IntegrationService } from './services/integration.service';
import { WebhookService } from './services/webhook.service';
import { IntegrationRepository } from './repositories/integration.repository';
import { EncryptionService } from './services/encryption.service';

@Module({
  controllers: [
    IntegrationController,
    WebhookController
  ],
  providers: [
    IntegrationService,
    WebhookService,
    IntegrationRepository,
    EncryptionService
  ],
  exports: [IntegrationService, WebhookService]
})
export class IntegrationsModule {}
