import { RbacRepository } from './rbac.repository';
import { PermissionCacheService } from './services/permission-cache.service';
import { PrismaService } from '../../common/prisma/prisma.service';
export declare class RbacService {
    private readonly repo;
    private readonly cache;
    private readonly prisma;
    constructor(repo: RbacRepository, cache: PermissionCacheService, prisma: PrismaService);
    assignPermissionToRole(tenantId: string, userId: string, roleId: string, permissionId: string): Promise<{
        roleId: string;
        permissionId: string;
    }>;
    removePermissionFromRole(tenantId: string, userId: string, roleId: string, permissionId: string): Promise<{
        roleId: string;
        permissionId: string;
    }>;
    assignRoleToUser(tenantId: string, actionUserId: string, targetUserId: string, roleId: string): Promise<{
        roleId: string;
        userId: string;
    }>;
    removeRoleFromUser(tenantId: string, actionUserId: string, targetUserId: string, roleId: string): Promise<{
        roleId: string;
        userId: string;
    }>;
}
