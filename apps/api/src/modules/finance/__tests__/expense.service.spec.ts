import { Test, TestingModule } from "@nestjs/testing";
import { ExpenseService } from "../services/expense.service";
import { ExpenseRepository } from "../repositories/expense.repository";
import { PrismaService } from "../../../common/prisma/prisma.service";

describe("ExpenseService", () => {
  let service: ExpenseService;

  const mockRepo = {
    findExpenses: jest.fn().mockResolvedValue([]),
    createExpense: jest.fn().mockResolvedValue({ id: "exp-1" }),
  };

  const mockPrisma = {
    auditLog: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseService,
        { provide: ExpenseRepository, useValue: mockRepo },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should find all", async () => {
    const res = await service.findAll("tenant-1");
    expect(res).toEqual([]);
    expect(mockRepo.findExpenses).toHaveBeenCalledWith("tenant-1");
  });

  it("should create expense", async () => {
    const dto = {
      categoryId: "cat-1",
      amount: 100,
      description: "Travel",
      date: "2026-07-08",
    };
    const res = await service.create("tenant-1", "user-1", dto);
    expect(res.id).toBe("exp-1");
    expect(mockRepo.createExpense).toHaveBeenCalledWith(
      "tenant-1",
      "user-1",
      dto
    );
    expect(mockPrisma.auditLog.create).toHaveBeenCalled();
  });
});
