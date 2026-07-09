import { Test, TestingModule } from "@nestjs/testing";
import { OpportunityService } from "../services/opportunity.service";
import { OpportunityRepository } from "../repositories/opportunity.repository";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { OpportunityStage } from "@prisma/client";

describe("OpportunityService", () => {
  let service: OpportunityService;
  let repo: jest.Mocked<OpportunityRepository>;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const mockRepo = {
      findOpportunities: jest.fn(),
      findById: jest.fn(),
      createOpportunity: jest.fn(),
      updateOpportunity: jest.fn(),
      updateStage: jest.fn(),
    };

    const mockPrisma = {
      auditLog: {
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpportunityService,
        { provide: OpportunityRepository, useValue: mockRepo },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<OpportunityService>(OpportunityService);
    repo = module.get(OpportunityRepository);
    prisma = module.get(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createOpportunity", () => {
    it("should create an opportunity and audit log", async () => {
      const dto = { name: "License", amount: 50000, customerId: "cust-1" };
      const createdOpp = {
        id: "opp-1",
        tenantId: "tenant-1",
        stage: OpportunityStage.PROSPECTING,
        ...dto,
      };

      repo.createOpportunity.mockResolvedValue(createdOpp as any);

      const result = await service.createOpportunity("tenant-1", "user-1", dto);

      expect(repo.createOpportunity).toHaveBeenCalledWith(
        "tenant-1",
        dto,
        "user-1"
      );
      expect(prisma.auditLog.create).toHaveBeenCalled();
      expect(result).toEqual(createdOpp);
    });
  });
});
