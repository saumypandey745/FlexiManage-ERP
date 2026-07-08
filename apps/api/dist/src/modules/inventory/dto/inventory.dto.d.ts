import { WarehouseStatus, MovementType } from '@prisma/client';
export declare class CreateProductDto {
    sku: string;
    name: string;
    price: number;
    categoryId?: string;
    description?: string;
    brand?: string;
    uom?: string;
    barcode?: string;
    reorderLevel?: number;
    safetyStock?: number;
}
declare const UpdateProductDto_base: import("@nestjs/common").Type<Partial<CreateProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
}
export declare class CreateWarehouseDto {
    code: string;
    name: string;
    location?: string;
    capacity?: number;
    status?: WarehouseStatus;
    managerId?: string;
}
declare const UpdateWarehouseDto_base: import("@nestjs/common").Type<Partial<CreateWarehouseDto>>;
export declare class UpdateWarehouseDto extends UpdateWarehouseDto_base {
}
export declare class StockMovementDto {
    type: MovementType;
    productId: string;
    quantity: number;
    fromWarehouseId?: string;
    toWarehouseId?: string;
    reference?: string;
    notes?: string;
}
export declare class CreatePurchaseOrderDto {
    poNumber: string;
    supplierId: string;
    totalAmount: number;
    expectedDate?: string;
}
export declare class ReceivePurchaseOrderDto {
    productId: string;
    quantity: number;
}
export {};
