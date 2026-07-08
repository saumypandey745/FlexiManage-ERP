"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let BillingRepository = class BillingRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPlans() {
        return this.prisma.saaSSubscriptionPlan.findMany({
            where: { isActive: true },
            include: { features: true, meteredFeatures: true }
        });
    }
    async createSubscription(tenantId, planId, currentPeriodStart, currentPeriodEnd) {
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
    async getSubscription(tenantId) {
        return this.prisma.saaSSubscription.findUnique({
            where: { tenantId },
            include: { plan: { include: { features: true, meteredFeatures: true } } }
        });
    }
    async updateSubscription(tenantId, subscriptionId, planId) {
        return this.prisma.saaSSubscription.update({
            where: { id: subscriptionId, tenantId },
            data: { planId }
        });
    }
    async cancelSubscription(tenantId, subscriptionId) {
        return this.prisma.saaSSubscription.update({
            where: { id: subscriptionId, tenantId },
            data: { cancelAtPeriodEnd: true }
        });
    }
    async logAudit(tenantId, userId, action, details) {
        return this.prisma.saaSBillingAudit.create({
            data: {
                tenantId,
                userId,
                action,
                details: details || {}
            }
        });
    }
    async createInvoice(tenantId, subscriptionId, amount) {
        return this.prisma.saaSInvoice.create({
            data: {
                tenantId,
                subscriptionId,
                amount,
                status: 'DRAFT',
            }
        });
    }
    async getInvoices(tenantId) {
        return this.prisma.saaSInvoice.findMany({
            where: { tenantId },
            include: { items: true, transactions: true },
            orderBy: { createdAt: 'desc' }
        });
    }
    async getInvoice(tenantId, id) {
        return this.prisma.saaSInvoice.findUnique({
            where: { id, tenantId },
            include: { items: true, transactions: true }
        });
    }
    async getUsage(tenantId) {
        return this.prisma.saaSSubscriptionUsage.findMany({
            where: { tenantId }
        });
    }
};
exports.BillingRepository = BillingRepository;
exports.BillingRepository = BillingRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BillingRepository);
//# sourceMappingURL=billing.repository.js.map