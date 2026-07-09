import { Test, TestingModule } from "@nestjs/testing";
import { LeaveService } from "../services/leave.service";
import { LeaveRepository } from "../repositories/leave.repository";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { LeaveStatus } from "@prisma/client";

describe("LeaveService", () => {
  let service: LeaveService;

  const mockRepo = {
    findLeaves: jest.fn().mockResolvedValue([]),
    createLeave: jest.fn().mockResolvedValue({ id: "leave-1" }),
    updateStatus: jest
      .fn()
      .mockResolvedValue({ id: "leave-1", status: "APPROVED" }),
  };

  const mockPrisma = {
    auditLog: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeaveService,
        { provide: LeaveRepository, useValue: mockRepo },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<LeaveService>(LeaveService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should find all", async () => {
    const res = await service.findAll("tenant-1");
    expect(res).toEqual([]);
    expect(mockRepo.findLeaves).toHaveBeenCalledWith("tenant-1");
  });

  it("should create leave", async () => {
    const dto = {
      leaveTypeId: "type-1",
      startDate: "2026-07-08",
      endDate: "2026-07-09",
      reason: "Sick",
    };
    const res = await service.create("tenant-1", "user-1", "emp-1", dto);
    expect(res.id).toBe("leave-1");
    expect(mockRepo.createLeave).toHaveBeenCalledWith("tenant-1", "emp-1", dto);
    expect(mockPrisma.auditLog.create).toHaveBeenCalled();
  });

  it("should update status", async () => {
    const dto = { status: LeaveStatus.APPROVED };
    const res = await service.updateStatus(
      "tenant-1",
      "leave-1",
      "user-1",
      dto
    );
    expect(res.status).toBe("APPROVED");
    expect(mockRepo.updateStatus).toHaveBeenCalledWith(
      "tenant-1",
      "leave-1",
      "user-1",
      dto
    );
  });
});
