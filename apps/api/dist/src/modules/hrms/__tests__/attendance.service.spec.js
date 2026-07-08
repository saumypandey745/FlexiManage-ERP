"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const attendance_service_1 = require("../services/attendance.service");
const attendance_repository_1 = require("../repositories/attendance.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
describe('AttendanceService', () => {
    let service;
    const mockRepo = {
        findAttendances: jest.fn().mockResolvedValue([]),
        clockIn: jest.fn().mockResolvedValue({ id: 'att-1' }),
        clockOut: jest.fn().mockResolvedValue({ id: 'att-1' }),
    };
    const mockPrisma = {
        auditLog: {
            create: jest.fn(),
        },
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                attendance_service_1.AttendanceService,
                { provide: attendance_repository_1.AttendanceRepository, useValue: mockRepo },
                { provide: prisma_service_1.PrismaService, useValue: mockPrisma },
            ],
        }).compile();
        service = module.get(attendance_service_1.AttendanceService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should find all', async () => {
        const res = await service.findAll('tenant-1');
        expect(res).toEqual([]);
        expect(mockRepo.findAttendances).toHaveBeenCalledWith('tenant-1');
    });
    it('should clock in', async () => {
        const dto = { employeeId: 'emp-1' };
        const res = await service.clockIn('tenant-1', 'user-1', dto);
        expect(res.id).toBe('att-1');
        expect(mockRepo.clockIn).toHaveBeenCalledWith('tenant-1', dto);
        expect(mockPrisma.auditLog.create).toHaveBeenCalled();
    });
    it('should clock out', async () => {
        const dto = { employeeId: 'emp-1' };
        const res = await service.clockOut('tenant-1', 'user-1', dto);
        expect(res.id).toBe('att-1');
        expect(mockRepo.clockOut).toHaveBeenCalledWith('tenant-1', dto);
        expect(mockPrisma.auditLog.create).toHaveBeenCalled();
    });
});
//# sourceMappingURL=attendance.service.spec.js.map