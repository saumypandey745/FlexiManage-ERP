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
exports.WarehouseService = void 0;
const common_1 = require("@nestjs/common");
const warehouse_repository_1 = require("../repositories/warehouse.repository");
const base_exception_1 = require("../../../common/exceptions/base.exception");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let WarehouseService = class WarehouseService {
    constructor(repository, prisma) {
        this.repository = repository;
        this.prisma = prisma;
    }
    async findAll(tenantId) {
        return this.repository.findWarehouses(tenantId);
    }
    async findOne(tenantId, id) {
        const warehouse = await this.repository.findById(tenantId, id);
        if (!warehouse) {
            throw new base_exception_1.BaseException('Warehouse not found', 'INV-WH-404', 404);
        }
        return warehouse;
    }
    async create(tenantId, actionUserId, dto) {
        const warehouse = await this.repository.createWarehouse(tenantId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'CREATE',
                entityName: 'Warehouse',
                entityId: warehouse.id,
                newValues: { code: dto.code },
            },
        });
        return warehouse;
    }
    async update(tenantId, id, actionUserId, dto) {
        await this.findOne(tenantId, id);
        const warehouse = await this.repository.updateWarehouse(tenantId, id, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'UPDATE',
                entityName: 'Warehouse',
                entityId: id,
                newValues: dto,
            },
        });
        return warehouse;
    }
    async delete(tenantId, id, actionUserId) {
        await this.findOne(tenantId, id);
        await this.repository.deleteWarehouse(tenantId, id);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'DELETE',
                entityName: 'Warehouse',
                entityId: id,
                newValues: { deleted: true },
            },
        });
        return { success: true };
    }
};
exports.WarehouseService = WarehouseService;
exports.WarehouseService = WarehouseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [warehouse_repository_1.WarehouseRepository,
        prisma_service_1.PrismaService])
], WarehouseService);
//# sourceMappingURL=warehouse.service.js.map