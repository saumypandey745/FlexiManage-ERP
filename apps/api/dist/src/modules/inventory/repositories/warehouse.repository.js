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
exports.WarehouseRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const base_exception_1 = require("../../../common/exceptions/base.exception");
let WarehouseRepository = class WarehouseRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findWarehouses(tenantId) {
        return this.prisma.warehouse.findMany({
            where: { tenantId, deletedAt: null },
            orderBy: { createdAt: 'desc' },
            include: { manager: true },
        });
    }
    async findById(tenantId, id) {
        const warehouse = await this.prisma.warehouse.findUnique({
            where: { id },
            include: { manager: true, stockItems: { include: { product: true } } },
        });
        if (!warehouse || warehouse.tenantId !== tenantId || warehouse.deletedAt)
            return null;
        return warehouse;
    }
    async createWarehouse(tenantId, dto) {
        const existing = await this.prisma.warehouse.findFirst({
            where: { tenantId, code: dto.code, deletedAt: null },
        });
        if (existing) {
            throw new base_exception_1.BaseException('Warehouse with this code already exists', 'INV-WH-409', 409);
        }
        return this.prisma.warehouse.create({
            data: { ...dto, tenantId },
        });
    }
    async updateWarehouse(tenantId, id, dto) {
        return this.prisma.warehouse.update({
            where: { id, tenantId },
            data: dto,
        });
    }
    async deleteWarehouse(tenantId, id) {
        return this.prisma.warehouse.update({
            where: { id, tenantId },
            data: { deletedAt: new Date(), status: 'CLOSED' },
        });
    }
};
exports.WarehouseRepository = WarehouseRepository;
exports.WarehouseRepository = WarehouseRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WarehouseRepository);
//# sourceMappingURL=warehouse.repository.js.map