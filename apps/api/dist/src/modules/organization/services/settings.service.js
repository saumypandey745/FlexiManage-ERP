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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const organization_repository_1 = require("../organization.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let SettingsService = class SettingsService {
    constructor(repo, prisma) {
        this.repo = repo;
        this.prisma = prisma;
    }
    async getOrganizationInfo(tenantId) {
        return this.repo.getTenantInfo(tenantId);
    }
    async updateSettings(tenantId, userId, dto) {
        const tenant = await this.repo.updateTenantSettings(tenantId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'UPDATE',
                entityName: 'TenantSettings',
                entityId: tenant.id,
                newValues: dto,
            },
        });
        return tenant;
    }
    async updateBusinessProfile(tenantId, userId, dto) {
        const profile = await this.repo.upsertBusinessProfile(tenantId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'UPDATE',
                entityName: 'OrganizationProfile',
                entityId: profile.id,
                newValues: dto,
            },
        });
        return profile;
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [organization_repository_1.OrganizationRepository,
        prisma_service_1.PrismaService])
], SettingsService);
//# sourceMappingURL=settings.service.js.map