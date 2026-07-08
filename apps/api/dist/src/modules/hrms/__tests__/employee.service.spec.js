"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const employee_service_1 = require("../services/employee.service");
const employee_repository_1 = require("../repositories/employee.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
describe('EmployeeService', () => {
    let service;
    const mockRepo = {
        findEmployees: jest.fn().mockResolvedValue([]),
        createEmployee: jest.fn().mockResolvedValue({ id: 'emp-1' }),
        updateEmployee: jest.fn().mockResolvedValue({ id: 'emp-1', firstName: 'John' }),
    };
    const mockPrisma = {
        auditLog: {
            create: jest.fn(),
        },
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                employee_service_1.EmployeeService,
                { provide: employee_repository_1.EmployeeRepository, useValue: mockRepo },
                { provide: prisma_service_1.PrismaService, useValue: mockPrisma },
            ],
        }).compile();
        service = module.get(employee_service_1.EmployeeService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should find all', async () => {
        const res = await service.findAll('tenant-1');
        expect(res).toEqual([]);
        expect(mockRepo.findEmployees).toHaveBeenCalledWith('tenant-1');
    });
    it('should create employee', async () => {
        const dto = { employeeCode: 'E001', firstName: 'John', lastName: 'Doe' };
        const res = await service.create('tenant-1', 'user-1', dto);
        expect(res.id).toBe('emp-1');
        expect(mockRepo.createEmployee).toHaveBeenCalledWith('tenant-1', dto);
        expect(mockPrisma.auditLog.create).toHaveBeenCalled();
    });
    it('should update employee', async () => {
        const dto = { firstName: 'John' };
        const res = await service.update('tenant-1', 'emp-1', 'user-1', dto);
        expect(res.firstName).toBe('John');
        expect(mockRepo.updateEmployee).toHaveBeenCalledWith('tenant-1', 'emp-1', dto);
    });
});
//# sourceMappingURL=employee.service.spec.js.map