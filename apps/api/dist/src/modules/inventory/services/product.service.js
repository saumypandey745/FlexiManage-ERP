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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("../repositories/product.repository");
const base_exception_1 = require("../../../common/exceptions/base.exception");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let ProductService = class ProductService {
    constructor(repository, prisma) {
        this.repository = repository;
        this.prisma = prisma;
    }
    async findAll(tenantId) {
        return this.repository.findProducts(tenantId);
    }
    async findOne(tenantId, id) {
        const product = await this.repository.findById(tenantId, id);
        if (!product) {
            throw new base_exception_1.BaseException('Product not found', 'INV-PROD-404', 404);
        }
        return product;
    }
    async create(tenantId, actionUserId, dto) {
        const product = await this.repository.createProduct(tenantId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'CREATE',
                entityName: 'Product',
                entityId: product.id,
                newValues: { sku: dto.sku },
            },
        });
        return product;
    }
    async update(tenantId, id, actionUserId, dto) {
        await this.findOne(tenantId, id);
        const product = await this.repository.updateProduct(tenantId, id, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'UPDATE',
                entityName: 'Product',
                entityId: product.id,
                newValues: dto,
            },
        });
        return product;
    }
    async delete(tenantId, id, actionUserId) {
        await this.findOne(tenantId, id);
        await this.repository.deleteProduct(tenantId, id);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'DELETE',
                entityName: 'Product',
                entityId: id,
                newValues: { deleted: true },
            },
        });
        return { success: true };
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository,
        prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map