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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingController = void 0;
const common_1 = require("@nestjs/common");
const billing_service_1 = require("../services/billing.service");
const subscription_service_1 = require("../services/subscription.service");
const billing_dto_1 = require("../dto/billing.dto");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const tenant_guard_1 = require("../../../common/guards/tenant.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const auth_decorators_1 = require("../../../common/decorators/auth.decorators");
const swagger_1 = require("@nestjs/swagger");
let BillingController = class BillingController {
    constructor(billingService, subscriptionService) {
        this.billingService = billingService;
        this.subscriptionService = subscriptionService;
    }
    getPlans() {
        return this.subscriptionService.getPlans();
    }
    getInvoices(req) {
        return this.billingService.getInvoices(req.user.tenantId);
    }
    getInvoice(req, id) {
        return this.billingService.getInvoice(req.user.tenantId, id);
    }
    processPayment(req, dto) {
        return this.billingService.processPayment(req.user.tenantId, req.user.id, dto);
    }
    getUsage(req) {
        return this.billingService.getUsage(req.user.tenantId);
    }
    createCoupon(req, dto) {
        return this.billingService.createCoupon(req.user.tenantId, dto);
    }
};
exports.BillingController = BillingController;
__decorate([
    (0, common_1.Get)('plans'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'List all available SaaS plans' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "getPlans", null);
__decorate([
    (0, common_1.Get)('invoices'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'List all invoices' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "getInvoices", null);
__decorate([
    (0, common_1.Get)('invoices/:id'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Get invoice details' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "getInvoice", null);
__decorate([
    (0, common_1.Post)('payments'),
    (0, auth_decorators_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Process a payment for an invoice' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, billing_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "processPayment", null);
__decorate([
    (0, common_1.Get)('usage'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current metered usage' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "getUsage", null);
__decorate([
    (0, common_1.Post)('coupons'),
    (0, auth_decorators_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a billing coupon' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, billing_dto_1.CreateCouponDto]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "createCoupon", null);
exports.BillingController = BillingController = __decorate([
    (0, swagger_1.ApiTags)('billing'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, tenant_guard_1.TenantGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('billing'),
    __metadata("design:paramtypes", [billing_service_1.BillingService,
        subscription_service_1.SubscriptionService])
], BillingController);
//# sourceMappingURL=billing.controller.js.map