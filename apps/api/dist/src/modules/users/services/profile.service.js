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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../user.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let ProfileService = class ProfileService {
    constructor(repo, prisma) {
        this.repo = repo;
        this.prisma = prisma;
    }
    async updateProfile(tenantId, userId, dto) {
        const profile = await this.repo.updateProfile(tenantId, userId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'UPDATE',
                entityName: 'UserProfile',
                entityId: profile.id,
                newValues: dto,
            },
        });
        return profile;
    }
    async updateAvatar(tenantId, userId, avatarUrl) {
        const profile = await this.repo.updateAvatar(tenantId, userId, avatarUrl);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'UPDATE',
                entityName: 'UserAvatar',
                entityId: profile.id,
                newValues: { avatarUrl },
            },
        });
        return profile;
    }
    async removeAvatar(tenantId, userId) {
        return this.updateAvatar(tenantId, userId, '');
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        prisma_service_1.PrismaService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map