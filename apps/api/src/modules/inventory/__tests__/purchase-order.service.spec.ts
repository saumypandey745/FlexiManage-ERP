import { Test, TestingModule } from "@nestjs/testing";
import { PurchaseOrderService } from "../services/purchase-order.service";
import { PurchaseOrderRepository } from "../repositories/purchase-order.repository";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { BaseException } from "../../../common/exceptions/base.exception";
import { POStatus } from "@prisma/client";

describe("PurchaseOrderService", () => {
  let service: PurchaseOrderService;
  let repo: any;
  let prisma: any;

  beforeEach(async () => {
    repo = {
      findPurchaseOrders: jest.fn(),
      findById: jest.fn(),
      createPO: jest.fn(),
      updateStatus: jest.fn(),
      receivePO: jest.fn(),
    };

    prisma = {
      auditLog: {
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseOrderService,
        { provide: PurchaseOrderRepository, useValue: repo },
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<PurchaseOrderService>(PurchaseOrderService);
  });

  it("should find all", async () => {
    repo.findPurchaseOrders.mockResolvedValue([]);
    expect(await service.findAll("t1")).toEqual([]);
  });

  it("should approve", async () => {
    repo.findById.mockResolvedValue({ id: "po1" });
    repo.updateStatus.mockResolvedValue({
      id: "po1",
      status: POStatus.APPROVED,
    });

    await service.approve("t1", "po1", "u1");
    expect(repo.updateStatus).toHaveBeenCalledWith(
      "t1",
      "po1",
      POStatus.APPROVED
    );
    expect(prisma.auditLog.create).toHaveBeenCalled();
  });
});
