import { Test, TestingModule } from "@nestjs/testing";
import { JournalService } from "../services/journal.service";
import { JournalRepository } from "../repositories/journal.repository";
import { PrismaService } from "../../../common/prisma/prisma.service";

describe("JournalService", () => {
  let service: JournalService;

  const mockRepo = {
    findEntries: jest.fn().mockResolvedValue([]),
    createEntry: jest.fn().mockResolvedValue({ id: "jnl-1" }),
  };

  const mockPrisma = {
    auditLog: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JournalService,
        { provide: JournalRepository, useValue: mockRepo },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<JournalService>(JournalService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should find all", async () => {
    const res = await service.findAll("tenant-1");
    expect(res).toEqual([]);
    expect(mockRepo.findEntries).toHaveBeenCalledWith("tenant-1");
  });

  it("should create journal entry", async () => {
    const dto = {
      reference: "REF-01",
      description: "Adjustment",
      entryDate: "2026-07-08",
      lines: [],
    };
    const res = await service.create("tenant-1", "user-1", dto);
    expect(res.id).toBe("jnl-1");
    expect(mockRepo.createEntry).toHaveBeenCalledWith("tenant-1", dto);
    expect(mockPrisma.auditLog.create).toHaveBeenCalled();
  });
});
