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
var BillingWebhookService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingWebhookService = void 0;
const common_1 = require("@nestjs/common");
const billing_repository_1 = require("../repositories/billing.repository");
let BillingWebhookService = BillingWebhookService_1 = class BillingWebhookService {
    constructor(repo) {
        this.repo = repo;
        this.logger = new common_1.Logger(BillingWebhookService_1.name);
    }
    async handleStripeWebhook(payload, signature) {
        this.logger.log('Received Stripe Webhook');
        return { success: true };
    }
    async handlePaypalWebhook(payload, signature) {
        this.logger.log('Received PayPal Webhook');
        return { success: true };
    }
    async handleRazorpayWebhook(payload, signature) {
        this.logger.log('Received Razorpay Webhook');
        return { success: true };
    }
};
exports.BillingWebhookService = BillingWebhookService;
exports.BillingWebhookService = BillingWebhookService = BillingWebhookService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [billing_repository_1.BillingRepository])
], BillingWebhookService);
//# sourceMappingURL=webhook.service.js.map