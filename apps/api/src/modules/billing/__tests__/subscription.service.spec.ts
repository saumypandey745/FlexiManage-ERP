import { Test, TestingModule } from "@nestjs/testing";
import { SubscriptionService } from "../services/subscription.service";
import { BillingRepository } from "../repositories/billing.repository";

describe("SubscriptionService", () => {
  let service: SubscriptionService;

  const mockRepo = {
    getSubscription: jest.fn().mockResolvedValue(null),
    createSubscription: jest
      .fn()
      .mockResolvedValue({ id: "sub-1", planId: "plan-1" }),
    logAudit: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionService,
        { provide: BillingRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<SubscriptionService>(SubscriptionService);
  });

  it("should create a subscription", async () => {
    const res = await service.createSubscription("tenant-1", "user-1", {
      planId: "plan-1",
    });
    expect(res.planId).toBe("plan-1");
    expect(mockRepo.logAudit).toHaveBeenCalledWith(
      "tenant-1",
      "user-1",
      "CREATE_SUBSCRIPTION",
      { planId: "plan-1" }
    );
  });

  it("should fail if subscription exists", async () => {
    mockRepo.getSubscription.mockResolvedValueOnce({ id: "sub-1" });
    await expect(
      service.createSubscription("tenant-1", "user-1", { planId: "plan-1" })
    ).rejects.toThrow("Tenant already has an active subscription");
  });
});
