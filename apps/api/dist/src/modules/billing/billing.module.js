"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingModule = void 0;
const common_1 = require("@nestjs/common");
const billing_controller_1 = require("./controllers/billing.controller");
const subscription_controller_1 = require("./controllers/subscription.controller");
const billing_service_1 = require("./services/billing.service");
const subscription_service_1 = require("./services/subscription.service");
const webhook_service_1 = require("./services/webhook.service");
const billing_repository_1 = require("./repositories/billing.repository");
let BillingModule = class BillingModule {
};
exports.BillingModule = BillingModule;
exports.BillingModule = BillingModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            billing_controller_1.BillingController,
            subscription_controller_1.SubscriptionController
        ],
        providers: [
            billing_service_1.BillingService,
            subscription_service_1.SubscriptionService,
            webhook_service_1.BillingWebhookService,
            billing_repository_1.BillingRepository
        ],
        exports: [billing_service_1.BillingService, subscription_service_1.SubscriptionService]
    })
], BillingModule);
//# sourceMappingURL=billing.module.js.map