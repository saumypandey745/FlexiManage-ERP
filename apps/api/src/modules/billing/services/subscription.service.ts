import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { BillingRepository } from "../repositories/billing.repository";
import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from "../dto/billing.dto";

@Injectable()
export class SubscriptionService {
  constructor(private readonly repo: BillingRepository) {}

  async createSubscription(
    tenantId: string,
    userId: string,
    dto: CreateSubscriptionDto
  ) {
    const existing = await this.repo.getSubscription(tenantId);
    if (existing) {
      throw new BadRequestException(
        "Tenant already has an active subscription"
      );
    }

    const currentPeriodStart = new Date();
    const currentPeriodEnd = new Date();
    currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1); // Mock 1 month interval

    const subscription = await this.repo.createSubscription(
      tenantId,
      dto.planId,
      currentPeriodStart,
      currentPeriodEnd
    );
    await this.repo.logAudit(tenantId, userId, "CREATE_SUBSCRIPTION", {
      planId: dto.planId,
    });
    return subscription;
  }

  async getSubscription(tenantId: string) {
    const subscription = await this.repo.getSubscription(tenantId);
    if (!subscription) throw new NotFoundException("Subscription not found");
    return subscription;
  }

  async updateSubscription(
    tenantId: string,
    subscriptionId: string,
    userId: string,
    dto: UpdateSubscriptionDto
  ) {
    const updated = await this.repo.updateSubscription(
      tenantId,
      subscriptionId,
      dto.planId
    );
    await this.repo.logAudit(tenantId, userId, "UPDATE_SUBSCRIPTION", {
      planId: dto.planId,
    });
    return updated;
  }

  async cancelSubscription(
    tenantId: string,
    subscriptionId: string,
    userId: string
  ) {
    const canceled = await this.repo.cancelSubscription(
      tenantId,
      subscriptionId
    );
    await this.repo.logAudit(tenantId, userId, "CANCEL_SUBSCRIPTION", {
      cancelAtPeriodEnd: true,
    });
    return canceled;
  }

  async getPlans() {
    return this.repo.getPlans();
  }
}
