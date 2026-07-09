import { Test, TestingModule } from "@nestjs/testing";
import { StockService } from "../services/stock.service";
import { StockRepository } from "../repositories/stock.repository";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { MovementType } from "@prisma/client";

describe("StockService", () => {
  let service: StockService;
  let repo: any;
  let prisma: any;

  beforeEach(async () => {
    repo = {
      getMovements: jest.fn(),
      processMovement: jest.fn(),
    };

    prisma = {
      auditLog: {
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockService,
        { provide: StockRepository, useValue: repo },
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<StockService>(StockService);
  });

  it("should get movements", async () => {
    repo.getMovements.mockResolvedValue([]);
    expect(await service.getMovements("t1")).toEqual([]);
  });

  it("should process movement and log", async () => {
    repo.processMovement.mockResolvedValue({ id: "sm1" });
    const dto = { type: MovementType.IN, productId: "p1", quantity: 10 };
    await service.processMovement("t1", "u1", dto);
    expect(repo.processMovement).toHaveBeenCalled();
    expect(prisma.auditLog.create).toHaveBeenCalled();
  });
});
