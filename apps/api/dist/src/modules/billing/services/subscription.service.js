"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const billing_repository_1 = require("../repositories/billing.repository");
let SubscriptionService = class SubscriptionService {
    constructor(repo) {
        this.repo = repo;
    }
    async createSubscription(tenantId, userId, dto) {
        const existing = await this.repo.getSubscription(tenantId);
        if (existing) {
            throw new common_1.BadRequestException('Tenant already has an active subscription');
        }
        const currentPeriodStart = new Date();
        const currentPeriodEnd = new Date();
        currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);
        const subscription = await this.repo.createSubscription(tenantId, dto.planId, currentPeriodStart, currentPeriodEnd);
        await this.repo.logAudit(tenantId, userId, 'CREATE_SUBSCRIPTION', { planId: dto.planId });
        return subscription;
    }
    async getSubscription(tenantId) {
        const subscription = await this.repo.getSubscription(tenantId);
        if (!subscription)
            throw new common_1.NotFoundException('Subscription not found');
        return subscription;
    }
    async updateSubscription(tenantId, subscriptionId, userId, dto) {
        const updated = await this.repo.updateSubscription(tenantId, subscriptionId, dto.planId);
        await this.repo.logAudit(tenantId, userId, 'UPDATE_SUBSCRIPTION', { planId: dto.planId });
        return updated;
    }
    async cancelSubscription(tenantId, subscriptionId, userId) {
        const canceled = await this.repo.cancelSubscription(tenantId, subscriptionId);
        await this.repo.logAudit(tenantId, userId, 'CANCEL_SUBSCRIPTION', { cancelAtPeriodEnd: true });
        return canceled;
    }
    async getPlans() {
        return this.repo.getPlans();
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [billing_repository_1.BillingRepository])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map