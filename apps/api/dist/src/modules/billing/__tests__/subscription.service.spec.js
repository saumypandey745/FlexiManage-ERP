"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const subscription_service_1 = require("../services/subscription.service");
const billing_repository_1 = require("../repositories/billing.repository");
describe('SubscriptionService', () => {
    let service;
    const mockRepo = {
        getSubscription: jest.fn().mockResolvedValue(null),
        createSubscription: jest.fn().mockResolvedValue({ id: 'sub-1', planId: 'plan-1' }),
        logAudit: jest.fn().mockResolvedValue(true),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                subscription_service_1.SubscriptionService,
                { provide: billing_repository_1.BillingRepository, useValue: mockRepo }
            ],
        }).compile();
        service = module.get(subscription_service_1.SubscriptionService);
    });
    it('should create a subscription', async () => {
        const res = await service.createSubscription('tenant-1', 'user-1', {
            planId: 'plan-1'
        });
        expect(res.planId).toBe('plan-1');
        expect(mockRepo.logAudit).toHaveBeenCalledWith('tenant-1', 'user-1', 'CREATE_SUBSCRIPTION', { planId: 'plan-1' });
    });
    it('should fail if subscription exists', async () => {
        mockRepo.getSubscription.mockResolvedValueOnce({ id: 'sub-1' });
        await expect(service.createSubscription('tenant-1', 'user-1', { planId: 'plan-1' }))
            .rejects.toThrow('Tenant already has an active subscription');
    });
});
//# sourceMappingURL=subscription.service.spec.js.map