import { Injectable } from '@nestjs/common';
import { RbacRepository } from './rbac.repository';
import { PermissionCacheService } from './services/permission-cache.service';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class RbacService {
  constructor(
    private readonly repo: RbacRepository,
    private readonly cache: PermissionCacheService,
    private readonly prisma: PrismaService,
  ) {}

  async assignPermissionToRole(tenantId: string, userId: string, roleId: string, permissionId: string) {
    const rp = await this.repo.assignPermissionToRole(roleId, permissionId);
    
    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: 'CREATE',
        entityName: 'RolePermission',
        entityId: `${roleId}-${permissionId}`,
      },
    });

    // Invalidate cache for users having this role
    const userRoles = await this.prisma.userRole.findMany({ where: { roleId }, select: { userId: true } });
    await this.cache.invalidateRolePermissions(roleId, userRoles.map(ur => ur.userId));

    return rp;
  }

  async removePermissionFromRole(tenantId: string, userId: string, roleId: string, permissionId: string) {
    const rp = await this.repo.removePermissionFromRole(roleId, permissionId);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: 'DELETE',
        entityName: 'RolePermission',
        entityId: `${roleId}-${permissionId}`,
      },
    });

    const userRoles = await this.prisma.userRole.findMany({ where: { roleId }, select: { userId: true } });
    await this.cache.invalidateRolePermissions(roleId, userRoles.map(ur => ur.userId));

    return rp;
  }

  async assignRoleToUser(tenantId: string, actionUserId: string, targetUserId: string, roleId: string) {
    const ur = await this.repo.assignRoleToUser(targetUserId, roleId);
    
    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: 'CREATE',
        entityName: 'UserRole',
        entityId: `${targetUserId}-${roleId}`,
      },
    });

    await this.cache.invalidateUserPermissions(targetUserId);

    return ur;
  }

  async removeRoleFromUser(tenantId: string, actionUserId: string, targetUserId: string, roleId: string) {
    const ur = await this.repo.removeRoleFromUser(targetUserId, roleId);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: 'DELETE',
        entityName: 'UserRole',
        entityId: `${targetUserId}-${roleId}`,
      },
    });

    await this.cache.invalidateUserPermissions(targetUserId);

    return ur;
  }
}
