import { Test, TestingModule } from '@nestjs/testing';
import { RbacService } from '../rbac.service';
import { RbacRepository } from '../rbac.repository';
import { PermissionCacheService } from '../services/permission-cache.service';
import { PrismaService } from '../../../common/prisma/prisma.service';

describe('RbacService', () => {
  let service: RbacService;
  let repo: jest.Mocked<Partial<RbacRepository>>;
  let cache: jest.Mocked<Partial<PermissionCacheService>>;
  let prisma: jest.Mocked<Partial<PrismaService>>;

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
      auditLog: { create: jest.fn() } as any,
      userRole: { findMany: jest.fn().mockResolvedValue([]) } as any,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RbacService,
        { provide: RbacRepository, useValue: repo },
        { provide: PermissionCacheService, useValue: cache },
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<RbacService>(RbacService);
  });

  it('should assign a role to a user and invalidate cache', async () => {
    (repo.assignRoleToUser as jest.Mock).mockResolvedValueOnce({});
    (prisma.auditLog!.create as jest.Mock).mockResolvedValueOnce({});
    (cache.invalidateUserPermissions as jest.Mock).mockResolvedValueOnce(undefined);

    await service.assignRoleToUser('tenant-1', 'admin', 'user-1', 'role-1');

    expect(repo.assignRoleToUser).toHaveBeenCalledWith('user-1', 'role-1');
    expect(prisma.auditLog!.create).toHaveBeenCalled();
    expect(cache.invalidateUserPermissions).toHaveBeenCalledWith('user-1');
  });

  it('should assign a permission to a role and invalidate cache', async () => {
    (repo.assignPermissionToRole as jest.Mock).mockResolvedValueOnce({});
    (prisma.auditLog!.create as jest.Mock).mockResolvedValueOnce({});
    (prisma.userRole!.findMany as jest.Mock).mockResolvedValueOnce([{ userId: 'u1' }]);
    (cache.invalidateRolePermissions as jest.Mock).mockResolvedValueOnce(undefined);

    await service.assignPermissionToRole('tenant-1', 'admin', 'role-1', 'perm-1');

    expect(repo.assignPermissionToRole).toHaveBeenCalledWith('role-1', 'perm-1');
    expect(prisma.auditLog!.create).toHaveBeenCalled();
    expect(cache.invalidateRolePermissions).toHaveBeenCalledWith('role-1', ['u1']);
  });
});
