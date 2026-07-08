"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const journal_service_1 = require("../services/journal.service");
const journal_repository_1 = require("../repositories/journal.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
describe('JournalService', () => {
    let service;
    const mockRepo = {
        findEntries: jest.fn().mockResolvedValue([]),
        createEntry: jest.fn().mockResolvedValue({ id: 'jnl-1' }),
    };
    const mockPrisma = {
        auditLog: {
            create: jest.fn(),
        },
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                journal_service_1.JournalService,
                { provide: journal_repository_1.JournalRepository, useValue: mockRepo },
                { provide: prisma_service_1.PrismaService, useValue: mockPrisma },
            ],
        }).compile();
        service = module.get(journal_service_1.JournalService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should find all', async () => {
        const res = await service.findAll('tenant-1');
        expect(res).toEqual([]);
        expect(mockRepo.findEntries).toHaveBeenCalledWith('tenant-1');
    });
    it('should create journal entry', async () => {
        const dto = { reference: 'REF-01', description: 'Adjustment', entryDate: '2026-07-08', lines: [] };
        const res = await service.create('tenant-1', 'user-1', dto);
        expect(res.id).toBe('jnl-1');
        expect(mockRepo.createEntry).toHaveBeenCalledWith('tenant-1', dto);
        expect(mockPrisma.auditLog.create).toHaveBeenCalled();
    });
});
//# sourceMappingURL=journal.service.spec.js.map