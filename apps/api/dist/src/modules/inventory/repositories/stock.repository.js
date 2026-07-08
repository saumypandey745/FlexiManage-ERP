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
exports.StockRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const base_exception_1 = require("../../../common/exceptions/base.exception");
const client_1 = require("@prisma/client");
let StockRepository = class StockRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMovements(tenantId) {
        return this.prisma.stockMovement.findMany({
            where: { tenantId },
            orderBy: { createdAt: 'desc' },
            include: { product: true, fromWarehouse: true, toWarehouse: true, performedBy: true },
        });
    }
    async processMovement(tenantId, actionUserId, dto) {
        return this.prisma.$transaction(async (tx) => {
            if (dto.type === client_1.MovementType.IN && dto.toWarehouseId) {
                await this.updateStock(tx, tenantId, dto.toWarehouseId, dto.productId, dto.quantity);
            }
            else if (dto.type === client_1.MovementType.OUT && dto.fromWarehouseId) {
                await this.updateStock(tx, tenantId, dto.fromWarehouseId, dto.productId, -dto.quantity);
            }
            else if (dto.type === client_1.MovementType.TRANSFER && dto.fromWarehouseId && dto.toWarehouseId) {
                await this.updateStock(tx, tenantId, dto.fromWarehouseId, dto.productId, -dto.quantity);
                await this.updateStock(tx, tenantId, dto.toWarehouseId, dto.productId, dto.quantity);
            }
            return tx.stockMovement.create({
                data: {
                    tenantId,
                    type: dto.type,
                    productId: dto.productId,
                    fromWarehouseId: dto.fromWarehouseId,
                    toWarehouseId: dto.toWarehouseId,
                    quantity: dto.quantity,
                    reference: dto.reference,
                    notes: dto.notes,
                    performedById: actionUserId,
                },
            });
        });
    }
    async updateStock(tx, tenantId, warehouseId, productId, qtyChange) {
        let stockItem = await tx.stockItem.findFirst({
            where: { tenantId, warehouseId, productId, batchNumber: null },
        });
        if (!stockItem) {
            if (qtyChange < 0) {
                throw new base_exception_1.BaseException('Insufficient stock', 'INV-STOCK-400', 400);
            }
            stockItem = await tx.stockItem.create({
                data: { tenantId, warehouseId, productId, quantity: qtyChange },
            });
        }
        else {
            if (stockItem.quantity + qtyChange < 0) {
                throw new base_exception_1.BaseException('Insufficient stock', 'INV-STOCK-400', 400);
            }
            stockItem = await tx.stockItem.update({
                where: { id: stockItem.id },
                data: { quantity: stockItem.quantity + qtyChange },
            });
        }
        return stockItem;
    }
};
exports.StockRepository = StockRepository;
exports.StockRepository = StockRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StockRepository);
//# sourceMappingURL=stock.repository.js.map