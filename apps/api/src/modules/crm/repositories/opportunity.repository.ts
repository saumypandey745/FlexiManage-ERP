import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateOpportunityDto, UpdateOpportunityDto } from '../dto/crm.dto';
import { OpportunityStage } from '@prisma/client';

@Injectable()
export class OpportunityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOpportunities(tenantId: string) {
    return this.prisma.opportunity.findMany({
      where: { tenantId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: { customer: true, assignedTo: true },
    });
  }

  async findById(tenantId: string, id: string) {
    const opp = await this.prisma.opportunity.findUnique({
      where: { id },
      include: { customer: true, assignedTo: true, history: true },
    });
    if (!opp || opp.tenantId !== tenantId || opp.deletedAt) return null;
    return opp;
  }

  async createOpportunity(tenantId: string, dto: CreateOpportunityDto, actionUserId: string) {
    const opp = await this.prisma.opportunity.create({
      data: { ...dto, tenantId },
    });

    await this.prisma.opportunityHistory.create({
      data: {
        opportunityId: opp.id,
        newStage: opp.stage,
        changedById: actionUserId,
      },
    });

    return opp;
  }

  async updateOpportunity(tenantId: string, id: string, dto: UpdateOpportunityDto, actionUserId: string) {
    const existing = await this.findById(tenantId, id);
    if (!existing) throw new Error('Not found');

    const updated = await this.prisma.opportunity.update({
      where: { id, tenantId },
      data: dto,
    });

    if (dto.stage && dto.stage !== existing.stage) {
      await this.prisma.opportunityHistory.create({
        data: {
          opportunityId: id,
          oldStage: existing.stage,
          newStage: dto.stage,
          changedById: actionUserId,
        },
      });
    }

    return updated;
  }

  async updateStage(tenantId: string, id: string, stage: OpportunityStage, actionUserId: string) {
    return this.updateOpportunity(tenantId, id, { stage }, actionUserId);
  }
}
