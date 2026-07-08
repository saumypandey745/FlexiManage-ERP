import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { Webhook, Prisma } from '@prisma/client';

@Injectable()
export class WebhookRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.WebhookCreateInput): Promise<Webhook> {
    return this.prisma.webhook.create({ data });
  }

  async findById(tenantId: string, id: string): Promise<Webhook | null> {
    return this.prisma.webhook.findUnique({
      where: { id, tenantId }
    });
  }

  async findMany(tenantId: string, params: { skip?: number; take?: number }): Promise<[Webhook[], number]> {
    const { skip, take } = params;
    return Promise.all([
      this.prisma.webhook.findMany({ skip, take, where: { tenantId } }),
      this.prisma.webhook.count({ where: { tenantId } })
    ]);
  }

  async update(tenantId: string, id: string, data: Prisma.WebhookUpdateInput): Promise<Webhook> {
    return this.prisma.webhook.update({
      where: { id, tenantId },
      data,
    });
  }

  async remove(tenantId: string, id: string): Promise<Webhook> {
    return this.prisma.webhook.delete({
      where: { id, tenantId }
    });
  }
}
