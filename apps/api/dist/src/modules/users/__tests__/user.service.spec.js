"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const user_service_1 = require("../services/user.service");
const user_repository_1 = require("../user.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const client_1 = require("@prisma/client");
describe('UserService', () => {
    let service;
    let repo;
    let prisma;
    beforeEach(async () => {
        repo = {
            createUser: jest.fn(),
            updateStatus: jest.fn(),
        };
        prisma = {
            auditLog: { create: jest.fn() },
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                user_service_1.UserService,
                { provide: user_repository_1.UserRepository, useValue: repo },
                { provide: prisma_service_1.PrismaService, useValue: prisma },
            ],
        }).compile();
        service = module.get(user_service_1.UserService);
    });
    it('should create a user and log audit', async () => {
        const mockUser = { id: 'user-1', email: 'test@test.com', status: client_1.UserStatus.INVITED };
        repo.createUser.mockResolvedValueOnce(mockUser);
        prisma.auditLog.create.mockResolvedValueOnce({});
        const result = await service.createUser('tenant-1', 'admin', { email: 'test@test.com', password: 'pw' });
        expect(result).toEqual(mockUser);
        expect(repo.createUser).toHaveBeenCalled();
        expect(prisma.auditLog.create).toHaveBeenCalled();
    });
    it('should update user status and log audit', async () => {
        const mockUser = { id: 'user-1', status: client_1.UserStatus.ACTIVE };
        repo.updateStatus.mockResolvedValueOnce(mockUser);
        prisma.auditLog.create.mockResolvedValueOnce({});
        const result = await service.changeStatus('tenant-1', 'user-1', 'admin', client_1.UserStatus.ACTIVE);
        expect(result).toEqual(mockUser);
        expect(repo.updateStatus).toHaveBeenCalledWith('tenant-1', 'user-1', client_1.UserStatus.ACTIVE);
        expect(prisma.auditLog.create).toHaveBeenCalled();
    });
});
//# sourceMappingURL=user.service.spec.js.map