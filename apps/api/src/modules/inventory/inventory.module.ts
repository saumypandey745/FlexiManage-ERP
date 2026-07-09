import { Module } from "@nestjs/common";
import { PrismaModule } from "../../common/prisma/prisma.module";
import { ProductRepository } from "./repositories/product.repository";
import { WarehouseRepository } from "./repositories/warehouse.repository";
import { StockRepository } from "./repositories/stock.repository";
import { PurchaseOrderRepository } from "./repositories/purchase-order.repository";
import { ProductService } from "./services/product.service";
import { WarehouseService } from "./services/warehouse.service";
import { StockService } from "./services/stock.service";
import { PurchaseOrderService } from "./services/purchase-order.service";
import { ProductController } from "./controllers/product.controller";
import { WarehouseController } from "./controllers/warehouse.controller";
import { StockController } from "./controllers/stock.controller";
import { PurchaseOrderController } from "./controllers/purchase-order.controller";

@Module({
  imports: [PrismaModule],
  controllers: [
    ProductController,
    WarehouseController,
    StockController,
    PurchaseOrderController,
  ],
  providers: [
    ProductRepository,
    WarehouseRepository,
    StockRepository,
    PurchaseOrderRepository,
    ProductService,
    WarehouseService,
    StockService,
    PurchaseOrderService,
  ],
  exports: [
    ProductService,
    WarehouseService,
    StockService,
    PurchaseOrderService,
  ],
})
export class InventoryModule {}
