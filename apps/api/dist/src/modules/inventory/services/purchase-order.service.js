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
exports.PurchaseOrderService = void 0;
const common_1 = require("@nestjs/common");
const purchase_order_repository_1 = require("../repositories/purchase-order.repository");
const base_exception_1 = require("../../../common/exceptions/base.exception");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const client_1 = require("@prisma/client");
let PurchaseOrderService = class PurchaseOrderService {
    constructor(repository, prisma) {
        this.repository = repository;
        this.prisma = prisma;
    }
    async findAll(tenantId) {
        return this.repository.findPurchaseOrders(tenantId);
    }
    async findOne(tenantId, id) {
        const po = await this.repository.findById(tenantId, id);
        if (!po)
            throw new base_exception_1.BaseException('PO not found', 'INV-PO-404', 404);
        return po;
    }
    async create(tenantId, actionUserId, dto) {
        const po = await this.repository.createPO(tenantId, actionUserId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'CREATE',
                entityName: 'PurchaseOrder',
                entityId: po.id,
                newValues: { poNumber: dto.poNumber },
            },
        });
        return po;
    }
    async approve(tenantId, id, actionUserId) {
        const po = await this.findOne(tenantId, id);
        const updated = await this.repository.updateStatus(tenantId, id, client_1.POStatus.APPROVED);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'UPDATE',
                entityName: 'PurchaseOrder',
                entityId: id,
                newValues: { status: client_1.POStatus.APPROVED },
            },
        });
        return updated;
    }
    async receive(tenantId, id, actionUserId, dto) {
        const result = await this.repository.receivePO(tenantId, id, actionUserId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'UPDATE',
                entityName: 'PurchaseOrder',
                entityId: id,
                newValues: { receivedQuantity: dto.quantity, productId: dto.productId },
            },
        });
        return result;
    }
};
exports.PurchaseOrderService = PurchaseOrderService;
exports.PurchaseOrderService = PurchaseOrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [purchase_order_repository_1.PurchaseOrderRepository,
        prisma_service_1.PrismaService])
], PurchaseOrderService);
//# sourceMappingURL=purchase-order.service.js.map