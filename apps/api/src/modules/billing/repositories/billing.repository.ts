// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class BillingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getPlans() {
    return this.prisma.saaSSubscriptionPlan.findMany({
      where: { isActive: true },
      include: { features: true, meteredFeatures: true }
    });
  }

  async createSubscription(tenantId: string, planId: string, currentPeriodStart: Date, currentPeriodEnd: Date) {
    return this.prisma.saaSSubscription.create({
      data: {
        tenantId,
        planId,
        status: 'ACTIVE',
        currentPeriodStart,
        currentPeriodEnd,
      },
      include: { plan: true }
    });
  }

  async getSubscription(tenantId: string) {
    return this.prisma.saaSSubscription.findUnique({
      where: { tenantId },
      include: { plan: { include: { features: true, meteredFeatures: true } } }
    });
  }

  async updateSubscription(tenantId: string, subscriptionId: string, planId: string) {
    return this.prisma.saaSSubscription.update({
      where: { id: subscriptionId, tenantId },
      data: { planId }
    });
  }

  async cancelSubscription(tenantId: string, subscriptionId: string) {
    return this.prisma.saaSSubscription.update({
      where: { id: subscriptionId, tenantId },
      data: { cancelAtPeriodEnd: true }
    });
  }

  async logAudit(tenantId: string, userId: string, action: string, details?: any) {
    return this.prisma.saaSBillingAudit.create({
      data: {
        tenantId,
        userId,
        action,
        details: details || {}
      }
    });
  }

  async createInvoice(tenantId: string, subscriptionId: string, amount: number) {
    return this.prisma.saaSInvoice.create({
      data: {
        tenantId,
        subscriptionId,
        amount,
        status: 'DRAFT',
      }
    });
  }

  async getInvoices(tenantId: string) {
    return this.prisma.saaSInvoice.findMany({
      where: { tenantId },
      include: { items: true, transactions: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getInvoice(tenantId: string, id: string) {
    return this.prisma.saaSInvoice.findUnique({
      where: { id, tenantId },
      include: { items: true, transactions: true }
    });
  }

  async getUsage(tenantId: string) {
    return this.prisma.saaSSubscriptionUsage.findMany({
      where: { tenantId }
    });
  }
}
