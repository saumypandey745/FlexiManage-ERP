import { Test, TestingModule } from "@nestjs/testing";
import { WarehouseService } from "../services/warehouse.service";
import { WarehouseRepository } from "../repositories/warehouse.repository";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { BaseException } from "../../../common/exceptions/base.exception";

describe("WarehouseService", () => {
  let service: WarehouseService;
  let repo: any;
  let prisma: any;

  beforeEach(async () => {
    repo = {
      findWarehouses: jest.fn(),
      findById: jest.fn(),
      createWarehouse: jest.fn(),
      updateWarehouse: jest.fn(),
      deleteWarehouse: jest.fn(),
    };

    prisma = {
      auditLog: {
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WarehouseService,
        { provide: WarehouseRepository, useValue: repo },
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<WarehouseService>(WarehouseService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return warehouses", async () => {
      repo.findWarehouses.mockResolvedValue([]);
      expect(await service.findAll("t1")).toEqual([]);
    });
  });

  describe("findOne", () => {
    it("should throw if not found", async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.findOne("t1", "w1")).rejects.toThrow(BaseException);
    });
  });
});
