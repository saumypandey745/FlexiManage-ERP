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
exports.PurchaseOrderRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const client_1 = require("@prisma/client");
const base_exception_1 = require("../../../common/exceptions/base.exception");
let PurchaseOrderRepository = class PurchaseOrderRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findPurchaseOrders(tenantId) {
        return this.prisma.purchaseOrder.findMany({
            where: { tenantId, deletedAt: null },
            orderBy: { createdAt: 'desc' },
            include: { supplier: true, createdBy: true },
        });
    }
    async findById(tenantId, id) {
        const po = await this.prisma.purchaseOrder.findUnique({
            where: { id },
            include: { supplier: true, createdBy: true, lines: true },
        });
        if (!po || po.tenantId !== tenantId || po.deletedAt)
            return null;
        return po;
    }
    async createPO(tenantId, actionUserId, dto) {
        return this.prisma.purchaseOrder.create({
            data: {
                tenantId,
                poNumber: dto.poNumber,
                supplierId: dto.supplierId,
                totalAmount: dto.totalAmount,
                expectedDate: dto.expectedDate ? new Date(dto.expectedDate) : null,
                createdById: actionUserId,
            },
        });
    }
    async updateStatus(tenantId, id, status) {
        return this.prisma.purchaseOrder.update({
            where: { id, tenantId },
            data: { status },
        });
    }
    async receivePO(tenantId, id, actionUserId, dto) {
        const po = await this.findById(tenantId, id);
        if (!po)
            throw new base_exception_1.BaseException('PO not found', 'INV-PO-404', 404);
        return this.prisma.$transaction(async (tx) => {
            const line = await tx.purchaseOrderLine.findFirst({
                where: { poId: id, productId: dto.productId },
            });
            if (!line)
                throw new base_exception_1.BaseException('Product not in PO', 'INV-PO-400', 400);
            await tx.purchaseOrderLine.update({
                where: { id: line.id },
                data: { received: line.received + dto.quantity },
            });
            await tx.purchaseOrder.update({
                where: { id },
                data: { status: client_1.POStatus.PARTIALLY_RECEIVED },
            });
            return line;
        });
    }
};
exports.PurchaseOrderRepository = PurchaseOrderRepository;
exports.PurchaseOrderRepository = PurchaseOrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PurchaseOrderRepository);
//# sourceMappingURL=purchase-order.repository.js.map