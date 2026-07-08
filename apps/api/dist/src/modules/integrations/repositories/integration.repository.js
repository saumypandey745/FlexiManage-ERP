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
exports.IntegrationRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const encryption_service_1 = require("../services/encryption.service");
let IntegrationRepository = class IntegrationRepository {
    constructor(prisma, encryption) {
        this.prisma = prisma;
        this.encryption = encryption;
    }
    async connect(tenantId, dto) {
        return this.prisma.$transaction(async (tx) => {
            const integration = await tx.integration.create({
                data: {
                    tenantId,
                    provider: dto.provider,
                    category: dto.category,
                    name: dto.name,
                    status: 'ACTIVE',
                }
            });
            if (dto.credentials) {
                for (const [key, value] of Object.entries(dto.credentials)) {
                    const { encryptedValue, iv } = this.encryption.encrypt(value);
                    await tx.integrationCredential.create({
                        data: {
                            integrationId: integration.id,
                            keyName: key,
                            encryptedValue,
                            iv
                        }
                    });
                }
            }
            if (dto.configuration) {
                await tx.providerConfiguration.create({
                    data: {
                        integrationId: integration.id,
                        config: dto.configuration
                    }
                });
            }
            return integration;
        });
    }
    async getIntegrations(tenantId) {
        return this.prisma.integration.findMany({
            where: { tenantId, deletedAt: null },
            include: { configuration: true }
        });
    }
    async getIntegration(tenantId, id) {
        const integration = await this.prisma.integration.findUnique({
            where: { id, tenantId },
            include: { configuration: true, credentials: true }
        });
        return integration;
    }
    async updateIntegration(tenantId, id, dto) {
        return this.prisma.$transaction(async (tx) => {
            const updated = await tx.integration.update({
                where: { id, tenantId },
                data: { name: dto.name }
            });
            if (dto.configuration) {
                await tx.providerConfiguration.upsert({
                    where: { integrationId: id },
                    update: { config: dto.configuration },
                    create: { integrationId: id, config: dto.configuration }
                });
            }
            return updated;
        });
    }
    async disconnect(tenantId, id) {
        return this.prisma.integration.update({
            where: { id, tenantId },
            data: { status: 'INACTIVE', deletedAt: new Date() }
        });
    }
    async createWebhookEndpoint(tenantId, dto) {
        return this.prisma.hubWebhookEndpoint.create({
            data: {
                tenantId,
                url: dto.url,
                secret: dto.secret,
                events: dto.events
            }
        });
    }
    async getWebhookEndpoints(tenantId) {
        return this.prisma.hubWebhookEndpoint.findMany({
            where: { tenantId }
        });
    }
    async logAudit(integrationId, userId, action, details) {
        return this.prisma.integrationAudit.create({
            data: {
                integrationId,
                userId,
                action,
                details: details || {}
            }
        });
    }
};
exports.IntegrationRepository = IntegrationRepository;
exports.IntegrationRepository = IntegrationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        encryption_service_1.EncryptionService])
], IntegrationRepository);
//# sourceMappingURL=integration.repository.js.map