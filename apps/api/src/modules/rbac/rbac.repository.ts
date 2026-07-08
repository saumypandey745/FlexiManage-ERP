import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { CreatePermissionDto, UpdatePermissionDto } from './dto/permission.dto';
import { BaseException } from '../../common/exceptions/base.exception';

@Injectable()
export class RbacRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ----------------------------------------------------
  // ROLES
  // ----------------------------------------------------
  async getRoles(tenantId: string) {
    return this.prisma.role.findMany({
      where: {
        OR: [{ tenantId }, { tenantId: null }], // Include global roles
      },
      include: { permissions: { include: { permission: true } } },
    });
  }

  async createRole(tenantId: string, dto: CreateRoleDto) {
    const exists = await this.prisma.role.findFirst({
      where: {
        name: dto.name,
        OR: [{ tenantId }, { tenantId: null }],
      },
    });

    if (exists) {
      throw new BaseException(`Role ${dto.name} already exists`, 'RBAC-409', 409);
    }

    return this.prisma.role.create({
      data: { name: dto.name, tenantId },
    });
  }

  async updateRole(tenantId: string, roleId: string, dto: UpdateRoleDto) {
    // Only allow updating roles belonging to the tenant
    return this.prisma.role.update({
      where: { id: roleId, tenantId },
      data: dto,
    });
  }

  async deleteRole(tenantId: string, roleId: string) {
    return this.prisma.role.delete({
      where: { id: roleId, tenantId },
    });
  }

  // ----------------------------------------------------
  // PERMISSIONS
  // ----------------------------------------------------
  async getPermissions() {
    return this.prisma.permission.findMany();
  }

  async createPermission(dto: CreatePermissionDto) {
    return this.prisma.permission.upsert({
      where: { action: dto.action },
      create: { action: dto.action },
      update: {},
    });
  }

  async updatePermission(permissionId: string, dto: UpdatePermissionDto) {
    return this.prisma.permission.update({
      where: { id: permissionId },
      data: { action: dto.action },
    });
  }

  async deletePermission(permissionId: string) {
    return this.prisma.permission.delete({
      where: { id: permissionId },
    });
  }

  // ----------------------------------------------------
  // ASSIGNMENTS
  // ----------------------------------------------------
  async assignPermissionToRole(roleId: string, permissionId: string) {
    return this.prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId, permissionId } },
      create: { roleId, permissionId },
      update: {},
    });
  }

  async removePermissionFromRole(roleId: string, permissionId: string) {
    return this.prisma.rolePermission.delete({
      where: { roleId_permissionId: { roleId, permissionId } },
    });
  }

  async assignRoleToUser(userId: string, roleId: string) {
    return this.prisma.userRole.upsert({
      where: { userId_roleId: { userId, roleId } },
      create: { userId, roleId },
      update: {},
    });
  }

  async removeRoleFromUser(userId: string, roleId: string) {
    return this.prisma.userRole.delete({
      where: { userId_roleId: { userId, roleId } },
    });
  }

  // ----------------------------------------------------
  // RESOLUTION
  // ----------------------------------------------------
  async getUserPermissions(userId: string) {
    const userRoles = await this.prisma.userRole.findMany({
      where: { userId },
      include: {
        role: {
          include: {
            permissions: {
              include: { permission: true },
            },
          },
        },
      },
    });

    const actions = new Set<string>();
    for (const ur of userRoles) {
      for (const rp of ur.role.permissions) {
        actions.add(rp.permission.action);
      }
    }
    return Array.from(actions);
  }
}
