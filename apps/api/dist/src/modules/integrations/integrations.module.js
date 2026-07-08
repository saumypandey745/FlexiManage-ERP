"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationsModule = void 0;
const common_1 = require("@nestjs/common");
const integration_controller_1 = require("./controllers/integration.controller");
const webhook_controller_1 = require("./controllers/webhook.controller");
const integration_service_1 = require("./services/integration.service");
const webhook_service_1 = require("./services/webhook.service");
const integration_repository_1 = require("./repositories/integration.repository");
const encryption_service_1 = require("./services/encryption.service");
let IntegrationsModule = class IntegrationsModule {
};
exports.IntegrationsModule = IntegrationsModule;
exports.IntegrationsModule = IntegrationsModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            integration_controller_1.IntegrationController,
            webhook_controller_1.WebhookController
        ],
        providers: [
            integration_service_1.IntegrationService,
            webhook_service_1.WebhookService,
            integration_repository_1.IntegrationRepository,
            encryption_service_1.EncryptionService
        ],
        exports: [integration_service_1.IntegrationService, webhook_service_1.WebhookService]
    })
], IntegrationsModule);
//# sourceMappingURL=integrations.module.js.map