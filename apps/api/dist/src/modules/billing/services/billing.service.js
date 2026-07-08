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
exports.BillingService = void 0;
const common_1 = require("@nestjs/common");
const billing_repository_1 = require("../repositories/billing.repository");
let BillingService = class BillingService {
    constructor(repo) {
        this.repo = repo;
    }
    async getInvoices(tenantId) {
        return this.repo.getInvoices(tenantId);
    }
    async getInvoice(tenantId, id) {
        const invoice = await this.repo.getInvoice(tenantId, id);
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        return invoice;
    }
    async processPayment(tenantId, userId, dto) {
        const invoice = await this.repo.getInvoice(tenantId, dto.invoiceId);
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        await this.repo.logAudit(tenantId, userId, 'PAYMENT_INITIATED', { provider: dto.provider, invoiceId: dto.invoiceId });
        return { success: true, transactionId: 'txn_mock123' };
    }
    async getUsage(tenantId) {
        return this.repo.getUsage(tenantId);
    }
    async createCoupon(tenantId, dto) {
        return { id: 'mock-coupon-1', ...dto };
    }
};
exports.BillingService = BillingService;
exports.BillingService = BillingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [billing_repository_1.BillingRepository])
], BillingService);
//# sourceMappingURL=billing.service.js.map