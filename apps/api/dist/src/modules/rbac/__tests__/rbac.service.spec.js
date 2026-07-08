"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const rbac_service_1 = require("../rbac.service");
const rbac_repository_1 = require("../rbac.repository");
const permission_cache_service_1 = require("../services/permission-cache.service");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
describe('RbacService', () => {
    let service;
    let repo;
    let cache;
    let prisma;
    beforeEach(async () => {
        repo = {
            assignPermissionToRole: jest.fn(),
            assignRoleToUser: jest.fn(),
        };
        cache = {
            invalidateRolePermissions: jest.fn(),
            invalidateUserPermissions: jest.fn(),
        };
        prisma = {
            auditLog: { create: jest.fn() },
            userRole: { findMany: jest.fn().mockResolvedValue([]) },
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                rbac_service_1.RbacService,
                { provide: rbac_repository_1.RbacRepository, useValue: repo },
                { provide: permission_cache_service_1.PermissionCacheService, useValue: cache },
                { provide: prisma_service_1.PrismaService, useValue: prisma },
            ],
        }).compile();
        service = module.get(rbac_service_1.RbacService);
    });
    it('should assign a role to a user and invalidate cache', async () => {
        repo.assignRoleToUser.mockResolvedValueOnce({});
        prisma.auditLog.create.mockResolvedValueOnce({});
        cache.invalidateUserPermissions.mockResolvedValueOnce(undefined);
        await service.assignRoleToUser('tenant-1', 'admin', 'user-1', 'role-1');
        expect(repo.assignRoleToUser).toHaveBeenCalledWith('user-1', 'role-1');
        expect(prisma.auditLog.create).toHaveBeenCalled();
        expect(cache.invalidateUserPermissions).toHaveBeenCalledWith('user-1');
    });
    it('should assign a permission to a role and invalidate cache', async () => {
        repo.assignPermissionToRole.mockResolvedValueOnce({});
        prisma.auditLog.create.mockResolvedValueOnce({});
        prisma.userRole.findMany.mockResolvedValueOnce([{ userId: 'u1' }]);
        cache.invalidateRolePermissions.mockResolvedValueOnce(undefined);
        await service.assignPermissionToRole('tenant-1', 'admin', 'role-1', 'perm-1');
        expect(repo.assignPermissionToRole).toHaveBeenCalledWith('role-1', 'perm-1');
        expect(prisma.auditLog.create).toHaveBeenCalled();
        expect(cache.invalidateRolePermissions).toHaveBeenCalledWith('role-1', ['u1']);
    });
});
//# sourceMappingURL=rbac.service.spec.js.map