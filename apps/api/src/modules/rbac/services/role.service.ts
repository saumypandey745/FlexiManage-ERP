import { Injectable } from '@nestjs/common';
import { RbacRepository } from '../rbac.repository';
import { CreateRoleDto, UpdateRoleDto } from '../dto/role.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(
    private readonly repo: RbacRepository,
    private readonly prisma: PrismaService,
  ) {}

  async getRoles(tenantId: string) {
    return this.repo.getRoles(tenantId);
  }

  async createRole(tenantId: string, userId: string, dto: CreateRoleDto) {
    const role = await this.repo.createRole(tenantId, dto);
    
    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: 'CREATE',
        entityName: 'Role',
        entityId: role.id,
        newValues: dto as any,
      },
    });

    return role;
  }

  async updateRole(tenantId: string, roleId: string, userId: string, dto: UpdateRoleDto) {
    const role = await this.repo.updateRole(tenantId, roleId, dto);
    
    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: 'UPDATE',
        entityName: 'Role',
        entityId: role.id,
        newValues: dto as any,
      },
    });

    return role;
  }

  async deleteRole(tenantId: string, roleId: string, userId: string) {
    const role = await this.repo.deleteRole(tenantId, roleId);
    
    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: 'DELETE',
        entityName: 'Role',
        entityId: role.id,
      },
    });

    return role;
  }
}
