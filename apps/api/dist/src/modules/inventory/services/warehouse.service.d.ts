import { WarehouseRepository } from '../repositories/warehouse.repository';
import { CreateWarehouseDto, UpdateWarehouseDto } from '../dto/inventory.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class WarehouseService {
    private readonly repository;
    private readonly prisma;
    constructor(repository: WarehouseRepository, prisma: PrismaService);
    findAll(tenantId: string): Promise<({
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
    findOne(tenantId: string, id: string): Promise<{
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
    create(tenantId: string, actionUserId: string, dto: CreateWarehouseDto): Promise<{
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
    update(tenantId: string, id: string, actionUserId: string, dto: UpdateWarehouseDto): Promise<{
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
    delete(tenantId: string, id: string, actionUserId: string): Promise<{
        success: boolean;
    }>;
}
