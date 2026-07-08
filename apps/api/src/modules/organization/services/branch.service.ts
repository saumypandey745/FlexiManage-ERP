import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from '../organization.repository';
import { CreateBranchDto, UpdateBranchDto } from '../dto/branch.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class BranchService {
  constructor(
    private readonly repo: OrganizationRepository,
    private readonly prisma: PrismaService,
  ) {}

  async getBranches(tenantId: string) {
    return this.repo.findBranches(tenantId);
  }

  async createBranch(tenantId: string, userId: string, dto: CreateBranchDto) {
    const branch = await this.repo.createBranch(tenantId, dto);
    
    // Audit Logging
    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: 'CREATE',
        entityName: 'Branch',
        entityId: branch.id,
        newValues: dto as any,
      },
    });

    return branch;
  }

  async updateBranch(tenantId: string, branchId: string, userId: string, dto: UpdateBranchDto) {
    const branch = await this.repo.updateBranch(tenantId, branchId, dto);
    
    // Audit Logging
    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: 'UPDATE',
        entityName: 'Branch',
        entityId: branch.id,
        newValues: dto as any,
      },
    });

    return branch;
  }

  async deleteBranch(tenantId: string, branchId: string, userId: string) {
    const branch = await this.repo.deleteBranch(tenantId, branchId);
    
    // Audit Logging
    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: 'DELETE',
        entityName: 'Branch',
        entityId: branch.id,
      },
    });

    return branch;
  }
}
