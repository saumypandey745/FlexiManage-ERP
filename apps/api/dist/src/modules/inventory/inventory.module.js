"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../common/prisma/prisma.module");
const product_repository_1 = require("./repositories/product.repository");
const warehouse_repository_1 = require("./repositories/warehouse.repository");
const stock_repository_1 = require("./repositories/stock.repository");
const purchase_order_repository_1 = require("./repositories/purchase-order.repository");
const product_service_1 = require("./services/product.service");
const warehouse_service_1 = require("./services/warehouse.service");
const stock_service_1 = require("./services/stock.service");
const purchase_order_service_1 = require("./services/purchase-order.service");
const product_controller_1 = require("./controllers/product.controller");
const warehouse_controller_1 = require("./controllers/warehouse.controller");
const stock_controller_1 = require("./controllers/stock.controller");
const purchase_order_controller_1 = require("./controllers/purchase-order.controller");
let InventoryModule = class InventoryModule {
};
exports.InventoryModule = InventoryModule;
exports.InventoryModule = InventoryModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [
            product_controller_1.ProductController,
            warehouse_controller_1.WarehouseController,
            stock_controller_1.StockController,
            purchase_order_controller_1.PurchaseOrderController,
        ],
        providers: [
            product_repository_1.ProductRepository,
            warehouse_repository_1.WarehouseRepository,
            stock_repository_1.StockRepository,
            purchase_order_repository_1.PurchaseOrderRepository,
            product_service_1.ProductService,
            warehouse_service_1.WarehouseService,
            stock_service_1.StockService,
            purchase_order_service_1.PurchaseOrderService,
        ],
        exports: [
            product_service_1.ProductService,
            warehouse_service_1.WarehouseService,
            stock_service_1.StockService,
            purchase_order_service_1.PurchaseOrderService,
        ],
    })
], InventoryModule);
//# sourceMappingURL=inventory.module.js.map