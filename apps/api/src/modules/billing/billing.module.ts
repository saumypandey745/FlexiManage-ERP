import { Module } from "@nestjs/common";
import { BillingController } from "./controllers/billing.controller";
import { SubscriptionController } from "./controllers/subscription.controller";
import { BillingService } from "./services/billing.service";
import { SubscriptionService } from "./services/subscription.service";
import { BillingWebhookService } from "./services/webhook.service";
import { BillingRepository } from "./repositories/billing.repository";

@Module({
  controllers: [BillingController, SubscriptionController],
  providers: [
    BillingService,
    SubscriptionService,
    BillingWebhookService,
    BillingRepository,
  ],
  exports: [BillingService, SubscriptionService],
})
export class BillingModule {}
