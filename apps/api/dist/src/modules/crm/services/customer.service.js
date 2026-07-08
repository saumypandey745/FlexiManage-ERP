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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const customer_repository_1 = require("../repositories/customer.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let CustomerService = class CustomerService {
    constructor(repo, prisma) {
        this.repo = repo;
        this.prisma = prisma;
    }
    async getCustomers(tenantId) {
        return this.repo.findCustomers(tenantId);
    }
    async getCustomerById(tenantId, id) {
        return this.repo.findById(tenantId, id);
    }
    async createCustomer(tenantId, actionUserId, dto) {
        const customer = await this.repo.createCustomer(tenantId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'CREATE',
                entityName: 'Customer',
                entityId: customer.id,
                newValues: dto,
            },
        });
        return customer;
    }
    async updateCustomer(tenantId, id, actionUserId, dto) {
        const customer = await this.repo.updateCustomer(tenantId, id, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'UPDATE',
                entityName: 'Customer',
                entityId: customer.id,
                newValues: dto,
            },
        });
        return customer;
    }
    async deleteCustomer(tenantId, id, actionUserId) {
        const customer = await this.repo.deleteCustomer(tenantId, id);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'DELETE',
                entityName: 'Customer',
                entityId: customer.id,
            },
        });
        return customer;
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [customer_repository_1.CustomerRepository,
        prisma_service_1.PrismaService])
], CustomerService);
//# sourceMappingURL=customer.service.js.map