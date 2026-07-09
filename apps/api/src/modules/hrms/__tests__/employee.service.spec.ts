import { Test, TestingModule } from "@nestjs/testing";
import { EmployeeService } from "../services/employee.service";
import { EmployeeRepository } from "../repositories/employee.repository";
import { PrismaService } from "../../../common/prisma/prisma.service";

describe("EmployeeService", () => {
  let service: EmployeeService;

  const mockRepo = {
    findEmployees: jest.fn().mockResolvedValue([]),
    createEmployee: jest.fn().mockResolvedValue({ id: "emp-1" }),
    updateEmployee: jest
      .fn()
      .mockResolvedValue({ id: "emp-1", firstName: "John" }),
  };

  const mockPrisma = {
    auditLog: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        { provide: EmployeeRepository, useValue: mockRepo },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should find all", async () => {
    const res = await service.findAll("tenant-1");
    expect(res).toEqual([]);
    expect(mockRepo.findEmployees).toHaveBeenCalledWith("tenant-1");
  });

  it("should create employee", async () => {
    const dto = { employeeCode: "E001", firstName: "John", lastName: "Doe" };
    const res = await service.create("tenant-1", "user-1", dto);
    expect(res.id).toBe("emp-1");
    expect(mockRepo.createEmployee).toHaveBeenCalledWith("tenant-1", dto);
    expect(mockPrisma.auditLog.create).toHaveBeenCalled();
  });

  it("should update employee", async () => {
    const dto = { firstName: "John" };
    const res = await service.update("tenant-1", "emp-1", "user-1", dto);
    expect(res.firstName).toBe("John");
    expect(mockRepo.updateEmployee).toHaveBeenCalledWith(
      "tenant-1",
      "emp-1",
      dto
    );
  });
});
