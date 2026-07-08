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
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const base_exception_1 = require("../../../common/exceptions/base.exception");
let ProductRepository = class ProductRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findProducts(tenantId) {
        return this.prisma.product.findMany({
            where: { tenantId, deletedAt: null },
            orderBy: { createdAt: 'desc' },
            include: { category: true, stockItems: true },
        });
    }
    async findById(tenantId, id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { category: true, stockItems: true, variants: true },
        });
        if (!product || product.tenantId !== tenantId || product.deletedAt)
            return null;
        return product;
    }
    async createProduct(tenantId, dto) {
        const existing = await this.prisma.product.findFirst({
            where: { tenantId, sku: dto.sku, deletedAt: null },
        });
        if (existing) {
            throw new base_exception_1.BaseException('Product with this SKU already exists', 'INV-PROD-409', 409);
        }
        return this.prisma.product.create({
            data: { ...dto, tenantId },
        });
    }
    async updateProduct(tenantId, id, dto) {
        return this.prisma.product.update({
            where: { id, tenantId },
            data: dto,
        });
    }
    async deleteProduct(tenantId, id) {
        return this.prisma.product.update({
            where: { id, tenantId },
            data: { deletedAt: new Date() },
        });
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductRepository);
//# sourceMappingURL=product.repository.js.map