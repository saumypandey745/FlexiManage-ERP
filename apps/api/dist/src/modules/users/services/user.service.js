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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../user.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let UserService = class UserService {
    constructor(repo, prisma) {
        this.repo = repo;
        this.prisma = prisma;
    }
    async getUsers(tenantId) {
        return this.repo.findUsers(tenantId);
    }
    async getUserById(tenantId, id) {
        return this.repo.findById(tenantId, id);
    }
    async createUser(tenantId, actionUserId, dto) {
        const user = await this.repo.createUser(tenantId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'CREATE',
                entityName: 'User',
                entityId: user.id,
                newValues: { email: dto.email, status: dto.status },
            },
        });
        return user;
    }
    async updateUser(tenantId, id, actionUserId, dto) {
        const user = await this.repo.updateUser(tenantId, id, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'UPDATE',
                entityName: 'User',
                entityId: user.id,
                newValues: dto,
            },
        });
        return user;
    }
    async deleteUser(tenantId, id, actionUserId) {
        const user = await this.repo.deleteUser(tenantId, id);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'DELETE',
                entityName: 'User',
                entityId: user.id,
            },
        });
        return user;
    }
    async changeStatus(tenantId, id, actionUserId, status) {
        const user = await this.repo.updateStatus(tenantId, id, status);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'UPDATE',
                entityName: 'UserStatus',
                entityId: user.id,
                newValues: { status },
            },
        });
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map