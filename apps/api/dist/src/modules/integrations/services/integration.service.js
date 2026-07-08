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
exports.IntegrationService = void 0;
const common_1 = require("@nestjs/common");
const integration_repository_1 = require("../repositories/integration.repository");
const encryption_service_1 = require("./encryption.service");
let IntegrationService = class IntegrationService {
    constructor(repo, encryption) {
        this.repo = repo;
        this.encryption = encryption;
    }
    async connect(tenantId, userId, dto) {
        const integration = await this.repo.connect(tenantId, dto);
        await this.repo.logAudit(integration.id, userId, 'CONNECT');
        return integration;
    }
    async getIntegrations(tenantId) {
        return this.repo.getIntegrations(tenantId);
    }
    async getIntegration(tenantId, id) {
        const integration = await this.repo.getIntegration(tenantId, id);
        if (!integration)
            throw new common_1.NotFoundException('Integration not found');
        const { credentials, ...safeIntegration } = integration;
        return safeIntegration;
    }
    async getDecryptedCredentials(tenantId, id) {
        const integration = await this.repo.getIntegration(tenantId, id);
        if (!integration)
            throw new common_1.NotFoundException('Integration not found');
        const creds = {};
        for (const cred of integration.credentials || []) {
            creds[cred.keyName] = this.encryption.decrypt(cred.encryptedValue, cred.iv);
        }
        return creds;
    }
    async updateIntegration(tenantId, id, userId, dto) {
        const updated = await this.repo.updateIntegration(tenantId, id, dto);
        await this.repo.logAudit(id, userId, 'UPDATE');
        return updated;
    }
    async disconnect(tenantId, id, userId) {
        const integration = await this.repo.disconnect(tenantId, id);
        await this.repo.logAudit(id, userId, 'DISCONNECT');
        return integration;
    }
    async sync(tenantId, id, userId) {
        await this.repo.logAudit(id, userId, 'MANUAL_SYNC');
        return { success: true, message: 'Sync job queued successfully' };
    }
};
exports.IntegrationService = IntegrationService;
exports.IntegrationService = IntegrationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [integration_repository_1.IntegrationRepository,
        encryption_service_1.EncryptionService])
], IntegrationService);
//# sourceMappingURL=integration.service.js.map