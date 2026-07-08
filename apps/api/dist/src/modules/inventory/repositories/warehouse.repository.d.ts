import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateWarehouseDto, UpdateWarehouseDto } from '../dto/inventory.dto';
export declare class WarehouseRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findWarehouses(tenantId: string): Promise<({
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
    findById(tenantId: string, id: string): Promise<({
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
    }) | null>;
    createWarehouse(tenantId: string, dto: CreateWarehouseDto): Promise<{
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
    updateWarehouse(tenantId: string, id: string, dto: UpdateWarehouseDto): Promise<{
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
    deleteWarehouse(tenantId: string, id: string): Promise<{
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
}
