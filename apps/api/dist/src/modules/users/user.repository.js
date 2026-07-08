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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const client_1 = require("@prisma/client");
const base_exception_1 = require("../../common/exceptions/base.exception");
let UserRepository = class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findUsers(tenantId) {
        return this.prisma.user.findMany({
            where: { tenantId, deletedAt: null },
            include: { profile: true, preference: true, roles: { include: { role: true } } },
        });
    }
    async findById(tenantId, id) {
        return this.prisma.user.findUnique({
            where: { id },
            include: { profile: true, preference: true, roles: { include: { role: true } } },
        });
    }
    async findByEmail(tenantId, email) {
        return this.prisma.user.findUnique({
            where: { tenantId_email: { tenantId, email } },
        });
    }
    async createUser(tenantId, dto) {
        const exists = await this.findByEmail(tenantId, dto.email);
        if (exists) {
            throw new base_exception_1.BaseException('Email already in use', 'USER-409', 409);
        }
        return this.prisma.user.create({
            data: {
                tenantId,
                email: dto.email,
                passwordHash: dto.password,
                status: dto.status || client_1.UserStatus.INVITED,
                profile: { create: {} },
                preference: { create: {} },
            },
        });
    }
    async updateUser(tenantId, id, dto) {
        return this.prisma.user.update({
            where: { id, tenantId },
            data: dto,
        });
    }
    async deleteUser(tenantId, id) {
        return this.prisma.user.update({
            where: { id, tenantId },
            data: { deletedAt: new Date(), status: client_1.UserStatus.ARCHIVED },
        });
    }
    async updateStatus(tenantId, id, status) {
        return this.prisma.user.update({
            where: { id, tenantId },
            data: { status },
        });
    }
    async updateProfile(tenantId, userId, dto) {
        return this.prisma.userProfile.upsert({
            where: { userId },
            create: { ...dto, userId },
            update: dto,
        });
    }
    async updatePreferences(tenantId, userId, dto) {
        return this.prisma.userPreference.upsert({
            where: { userId },
            create: { ...dto, userId },
            update: dto,
        });
    }
    async updateAvatar(tenantId, userId, avatarUrl) {
        return this.prisma.userProfile.update({
            where: { userId },
            data: { avatarUrl },
        });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRepository);
//# sourceMappingURL=user.repository.js.map