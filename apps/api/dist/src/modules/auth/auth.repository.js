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
exports.AuthRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const argon2 = require("argon2");
let AuthRepository = class AuthRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findUserByEmail(email) {
        return this.prisma.user.findFirst({
            where: { email, deletedAt: null },
            include: {
                tenant: true,
                roles: { include: { role: true } },
            },
        });
    }
    async findById(id) {
        return this.prisma.user.findUnique({
            where: { id },
            include: { roles: { include: { role: true } } },
        });
    }
    async createTenantWithAdmin(dto) {
        const hashedPassword = await argon2.hash(dto.password);
        return this.prisma.$transaction(async (tx) => {
            const tenant = await tx.tenant.create({
                data: {
                    name: dto.companyName,
                    status: 'ACTIVE',
                },
            });
            const adminRole = await tx.role.create({
                data: {
                    name: 'SuperAdmin',
                    tenantId: tenant.id,
                },
            });
            const user = await tx.user.create({
                data: {
                    email: dto.email,
                    passwordHash: hashedPassword,
                    tenantId: tenant.id,
                    status: 'ACTIVE',
                    roles: {
                        create: {
                            roleId: adminRole.id,
                        },
                    },
                },
            });
            await tx.employee.create({
                data: {
                    tenantId: tenant.id,
                    userId: user.id,
                    employeeCode: 'EMP-0001',
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    status: 'CONFIRMED',
                },
            });
            return { tenant, user };
        });
    }
    async updateUserPassword(userId, passwordHash) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { passwordHash },
        });
    }
    async markEmailAsVerified(userId) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { status: 'ACTIVE' },
        });
    }
};
exports.AuthRepository = AuthRepository;
exports.AuthRepository = AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthRepository);
//# sourceMappingURL=auth.repository.js.map