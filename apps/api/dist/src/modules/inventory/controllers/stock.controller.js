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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockController = void 0;
const common_1 = require("@nestjs/common");
const stock_service_1 = require("../services/stock.service");
const inventory_dto_1 = require("../dto/inventory.dto");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const tenant_guard_1 = require("../../../common/guards/tenant.guard");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
let StockController = class StockController {
    constructor(stockService) {
        this.stockService = stockService;
    }
    getMovements(req) {
        return this.stockService.getMovements(req.user.tenantId);
    }
    stockIn(req, dto) {
        dto.type = client_1.MovementType.IN;
        return this.stockService.processMovement(req.user.tenantId, req.user.id, dto);
    }
    stockOut(req, dto) {
        dto.type = client_1.MovementType.OUT;
        return this.stockService.processMovement(req.user.tenantId, req.user.id, dto);
    }
    stockTransfer(req, dto) {
        dto.type = client_1.MovementType.TRANSFER;
        return this.stockService.processMovement(req.user.tenantId, req.user.id, dto);
    }
};
exports.StockController = StockController;
__decorate([
    (0, common_1.Get)('movements'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all stock movements' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StockController.prototype, "getMovements", null);
__decorate([
    (0, common_1.Post)('in'),
    (0, swagger_1.ApiOperation)({ summary: 'Stock In' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, inventory_dto_1.StockMovementDto]),
    __metadata("design:returntype", void 0)
], StockController.prototype, "stockIn", null);
__decorate([
    (0, common_1.Post)('out'),
    (0, swagger_1.ApiOperation)({ summary: 'Stock Out' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, inventory_dto_1.StockMovementDto]),
    __metadata("design:returntype", void 0)
], StockController.prototype, "stockOut", null);
__decorate([
    (0, common_1.Post)('transfer'),
    (0, swagger_1.ApiOperation)({ summary: 'Stock Transfer' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, inventory_dto_1.StockMovementDto]),
    __metadata("design:returntype", void 0)
], StockController.prototype, "stockTransfer", null);
exports.StockController = StockController = __decorate([
    (0, swagger_1.ApiTags)('Inventory Stock'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, tenant_guard_1.TenantGuard),
    (0, common_1.Controller)('inventory/stock'),
    __metadata("design:paramtypes", [stock_service_1.StockService])
], StockController);
//# sourceMappingURL=stock.controller.js.map