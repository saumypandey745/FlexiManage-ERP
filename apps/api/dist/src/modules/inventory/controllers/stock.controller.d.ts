import { StockService } from '../services/stock.service';
import { StockMovementDto } from '../dto/inventory.dto';
export declare class StockController {
    private readonly stockService;
    constructor(stockService: StockService);
    getMovements(req: any): Promise<({
        product: {
            description: string | null;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            sku: string;
            price: import("@prisma/client/runtime/library").Decimal;
            categoryId: string | null;
            brand: string | null;
            uom: string;
            barcode: string | null;
            reorderLevel: number;
            safetyStock: number;
        };
        fromWarehouse: {
            code: string;
            status: import(".prisma/client").$Enums.WarehouseStatus;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            managerId: string | null;
            location: string | null;
            capacity: number;
        } | null;
        toWarehouse: {
            code: string;
            status: import(".prisma/client").$Enums.WarehouseStatus;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            managerId: string | null;
            location: string | null;
            capacity: number;
        } | null;
        performedBy: {
            status: import(".prisma/client").$Enums.UserStatus;
            email: string;
            id: string;
            tenantId: string;
            passwordHash: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    } & {
        type: import(".prisma/client").$Enums.MovementType;
        id: string;
        tenantId: string;
        createdAt: Date;
        notes: string | null;
        productId: string;
        quantity: number;
        fromWarehouseId: string | null;
        toWarehouseId: string | null;
        reference: string | null;
        performedById: string;
    })[]>;
    stockIn(req: any, dto: StockMovementDto): Promise<{
        type: import(".prisma/client").$Enums.MovementType;
        id: string;
        tenantId: string;
        createdAt: Date;
        notes: string | null;
        productId: string;
        quantity: number;
        fromWarehouseId: string | null;
        toWarehouseId: string | null;
        reference: string | null;
        performedById: string;
    }>;
    stockOut(req: any, dto: StockMovementDto): Promise<{
        type: import(".prisma/client").$Enums.MovementType;
        id: string;
        tenantId: string;
        createdAt: Date;
        notes: string | null;
        productId: string;
        quantity: number;
        fromWarehouseId: string | null;
        toWarehouseId: string | null;
        reference: string | null;
        performedById: string;
    }>;
    stockTransfer(req: any, dto: StockMovementDto): Promise<{
        type: import(".prisma/client").$Enums.MovementType;
        id: string;
        tenantId: string;
        createdAt: Date;
        notes: string | null;
        productId: string;
        quantity: number;
        fromWarehouseId: string | null;
        toWarehouseId: string | null;
        reference: string | null;
        performedById: string;
    }>;
}
