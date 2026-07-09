import { Injectable } from "@nestjs/common";
import { LeadRepository } from "../repositories/lead.repository";
import { CreateLeadDto, UpdateLeadDto } from "../dto/crm.dto";
import { LeadStatus } from "@prisma/client";
import { PrismaService } from "../../../common/prisma/prisma.service";

@Injectable()
export class LeadService {
  constructor(
    private readonly repo: LeadRepository,
    private readonly prisma: PrismaService
  ) {}

  async getLeads(tenantId: string) {
    return this.repo.findLeads(tenantId);
  }

  async getLeadById(tenantId: string, id: string) {
    return this.repo.findById(tenantId, id);
  }

  async createLead(tenantId: string, actionUserId: string, dto: CreateLeadDto) {
    const lead = await this.repo.createLead(tenantId, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: "CREATE",
        entityName: "Lead",
        entityId: lead.id,
        newValues: dto as any,
      },
    });

    return lead;
  }

  async updateLead(
    tenantId: string,
    id: string,
    actionUserId: string,
    dto: UpdateLeadDto
  ) {
    const lead = await this.repo.updateLead(tenantId, id, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: "UPDATE",
        entityName: "Lead",
        entityId: lead.id,
        newValues: dto as any,
      },
    });

    return lead;
  }

  async deleteLead(tenantId: string, id: string, actionUserId: string) {
    const lead = await this.repo.deleteLead(tenantId, id);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: "DELETE",
        entityName: "Lead",
        entityId: lead.id,
      },
    });

    return lead;
  }
}
