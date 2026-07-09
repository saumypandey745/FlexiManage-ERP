import { Test, TestingModule } from "@nestjs/testing";
import { AttendanceService } from "../services/attendance.service";
import { AttendanceRepository } from "../repositories/attendance.repository";
import { PrismaService } from "../../../common/prisma/prisma.service";

describe("AttendanceService", () => {
  let service: AttendanceService;

  const mockRepo = {
    findAttendances: jest.fn().mockResolvedValue([]),
    clockIn: jest.fn().mockResolvedValue({ id: "att-1" }),
    clockOut: jest.fn().mockResolvedValue({ id: "att-1" }),
  };

  const mockPrisma = {
    auditLog: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttendanceService,
        { provide: AttendanceRepository, useValue: mockRepo },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<AttendanceService>(AttendanceService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should find all", async () => {
    const res = await service.findAll("tenant-1");
    expect(res).toEqual([]);
    expect(mockRepo.findAttendances).toHaveBeenCalledWith("tenant-1");
  });

  it("should clock in", async () => {
    const dto = { employeeId: "emp-1" };
    const res = await service.clockIn("tenant-1", "user-1", dto);
    expect(res.id).toBe("att-1");
    expect(mockRepo.clockIn).toHaveBeenCalledWith("tenant-1", dto);
    expect(mockPrisma.auditLog.create).toHaveBeenCalled();
  });

  it("should clock out", async () => {
    const dto = { employeeId: "emp-1" };
    const res = await service.clockOut("tenant-1", "user-1", dto);
    expect(res.id).toBe("att-1");
    expect(mockRepo.clockOut).toHaveBeenCalledWith("tenant-1", dto);
    expect(mockPrisma.auditLog.create).toHaveBeenCalled();
  });
});
