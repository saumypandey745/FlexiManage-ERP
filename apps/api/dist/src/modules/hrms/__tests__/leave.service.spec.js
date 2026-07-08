"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const leave_service_1 = require("../services/leave.service");
const leave_repository_1 = require("../repositories/leave.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const client_1 = require("@prisma/client");
describe('LeaveService', () => {
    let service;
    const mockRepo = {
        findLeaves: jest.fn().mockResolvedValue([]),
        createLeave: jest.fn().mockResolvedValue({ id: 'leave-1' }),
        updateStatus: jest.fn().mockResolvedValue({ id: 'leave-1', status: 'APPROVED' }),
    };
    const mockPrisma = {
        auditLog: {
            create: jest.fn(),
        },
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                leave_service_1.LeaveService,
                { provide: leave_repository_1.LeaveRepository, useValue: mockRepo },
                { provide: prisma_service_1.PrismaService, useValue: mockPrisma },
            ],
        }).compile();
        service = module.get(leave_service_1.LeaveService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should find all', async () => {
        const res = await service.findAll('tenant-1');
        expect(res).toEqual([]);
        expect(mockRepo.findLeaves).toHaveBeenCalledWith('tenant-1');
    });
    it('should create leave', async () => {
        const dto = { leaveTypeId: 'type-1', startDate: '2026-07-08', endDate: '2026-07-09', reason: 'Sick' };
        const res = await service.create('tenant-1', 'user-1', 'emp-1', dto);
        expect(res.id).toBe('leave-1');
        expect(mockRepo.createLeave).toHaveBeenCalledWith('tenant-1', 'emp-1', dto);
        expect(mockPrisma.auditLog.create).toHaveBeenCalled();
    });
    it('should update status', async () => {
        const dto = { status: client_1.LeaveStatus.APPROVED };
        const res = await service.updateStatus('tenant-1', 'leave-1', 'user-1', dto);
        expect(res.status).toBe('APPROVED');
        expect(mockRepo.updateStatus).toHaveBeenCalledWith('tenant-1', 'leave-1', 'user-1', dto);
    });
});
//# sourceMappingURL=leave.service.spec.js.map