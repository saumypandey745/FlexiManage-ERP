import { Injectable } from '@nestjs/common';
import { OpportunityRepository } from '../repositories/opportunity.repository';
import { CreateOpportunityDto, UpdateOpportunityDto } from '../dto/crm.dto';
import { OpportunityStage } from '@prisma/client';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class OpportunityService {
  constructor(
    private readonly repo: OpportunityRepository,
    private readonly prisma: PrismaService,
  ) {}

  async getOpportunities(tenantId: string) {
    return this.repo.findOpportunities(tenantId);
  }

  async getOpportunityById(tenantId: string, id: string) {
    return this.repo.findById(tenantId, id);
  }

  async createOpportunity(tenantId: string, actionUserId: string, dto: CreateOpportunityDto) {
    const opp = await this.repo.createOpportunity(tenantId, dto, actionUserId);
    
    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: 'CREATE',
        entityName: 'Opportunity',
        entityId: opp.id,
        newValues: dto as any,
      },
    });

    return opp;
  }

  async updateOpportunity(tenantId: string, id: string, actionUserId: string, dto: UpdateOpportunityDto) {
    const opp = await this.repo.updateOpportunity(tenantId, id, dto, actionUserId);
    
    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: 'UPDATE',
        entityName: 'Opportunity',
        entityId: opp.id,
        newValues: dto as any,
      },
    });

    return opp;
  }

  async setStage(tenantId: string, id: string, actionUserId: string, stage: OpportunityStage) {
    return this.repo.updateStage(tenantId, id, stage, actionUserId);
  }
}
