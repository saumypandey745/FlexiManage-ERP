import { WarehouseService } from '../services/warehouse.service';
import { CreateWarehouseDto, UpdateWarehouseDto } from '../dto/inventory.dto';
export declare class WarehouseController {
    private readonly warehouseService;
    constructor(warehouseService: WarehouseService);
    create(req: any, createDto: CreateWarehouseDto): Promise<{
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
    }>;
    findAll(req: any): Promise<({
        manager: {
            status: import(".prisma/client").$Enums.UserStatus;
            email: string;
            id: string;
            tenantId: string;
            passwordHash: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        } | null;
    } & {
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
    })[]>;
    findOne(req: any, id: string): Promise<{
        stockItems: ({
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
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            quantity: number;
            warehouseId: string;
            reserved: number;
            batchNumber: string | null;
            expiryDate: Date | null;
        })[];
        manager: {
            status: import(".prisma/client").$Enums.UserStatus;
            email: string;
            id: string;
            tenantId: string;
            passwordHash: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        } | null;
    } & {
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
    }>;
    update(req: any, id: string, updateDto: UpdateWarehouseDto): Promise<{
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
    }>;
    remove(req: any, id: string): Promise<{
        success: boolean;
    }>;
}
