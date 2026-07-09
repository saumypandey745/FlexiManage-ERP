import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { CreateLeadDto, UpdateLeadDto } from "../dto/crm.dto";
import { LeadStatus } from "@prisma/client";
import { BaseException } from "../../../common/exceptions/base.exception";

@Injectable()
export class LeadRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findLeads(tenantId: string) {
    return this.prisma.lead.findMany({
      where: { tenantId, deletedAt: null },
      orderBy: { createdAt: "desc" },
      include: { assignedTo: true, activities: true, notes: true },
    });
  }

  async findById(tenantId: string, id: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
      include: { assignedTo: true, activities: true, notes: true },
    });
    if (!lead || lead.tenantId !== tenantId || lead.deletedAt) return null;
    return lead;
  }

  async createLead(tenantId: string, dto: CreateLeadDto) {
    const existing = await this.prisma.lead.findFirst({
      where: { tenantId, email: dto.email, deletedAt: null },
    });

    if (existing) {
      throw new BaseException(
        "Lead with this email already exists",
        "CRM-LEAD-409",
        409
      );
    }

    return this.prisma.lead.create({
      data: { ...dto, tenantId },
    });
  }

  async updateLead(tenantId: string, id: string, dto: UpdateLeadDto) {
    return this.prisma.lead.update({
      where: { id, tenantId },
      data: dto,
    });
  }

  async deleteLead(tenantId: string, id: string) {
    return this.prisma.lead.update({
      where: { id, tenantId },
      data: { deletedAt: new Date(), status: LeadStatus.ARCHIVED },
    });
  }

  async updateStatus(tenantId: string, id: string, status: LeadStatus) {
    return this.prisma.lead.update({
      where: { id, tenantId },
      data: { status },
    });
  }
}
