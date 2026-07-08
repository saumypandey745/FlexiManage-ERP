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
exports.CustomerRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let CustomerRepository = class CustomerRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findCustomers(tenantId) {
        return this.prisma.customer.findMany({
            where: { tenantId, deletedAt: null },
            orderBy: { createdAt: 'desc' },
            include: { assignedTo: true, contacts: true, opportunities: true },
        });
    }
    async findById(tenantId, id) {
        const customer = await this.prisma.customer.findUnique({
            where: { id },
            include: { assignedTo: true, contacts: true, opportunities: true, notes: true },
        });
        if (!customer || customer.tenantId !== tenantId || customer.deletedAt)
            return null;
        return customer;
    }
    async createCustomer(tenantId, dto) {
        return this.prisma.customer.create({
            data: { ...dto, tenantId },
        });
    }
    async updateCustomer(tenantId, id, dto) {
        return this.prisma.customer.update({
            where: { id, tenantId },
            data: dto,
        });
    }
    async deleteCustomer(tenantId, id) {
        return this.prisma.customer.update({
            where: { id, tenantId },
            data: { deletedAt: new Date() },
        });
    }
};
exports.CustomerRepository = CustomerRepository;
exports.CustomerRepository = CustomerRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomerRepository);
//# sourceMappingURL=customer.repository.js.map