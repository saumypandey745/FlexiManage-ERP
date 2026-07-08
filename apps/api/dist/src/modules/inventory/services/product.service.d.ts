import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto, UpdateProductDto } from '../dto/inventory.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class ProductService {
    private readonly repository;
    private readonly prisma;
    constructor(repository: ProductRepository, prisma: PrismaService);
    findAll(tenantId: string): Promise<({
        stockItems: {
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
        }[];
        category: {
            description: string | null;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            parentId: string | null;
        } | null;
    } & {
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
    })[]>;
    findOne(tenantId: string, id: string): Promise<{
        stockItems: {
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
        }[];
        category: {
            description: string | null;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            parentId: string | null;
        } | null;
        variants: {
            options: import("@prisma/client/runtime/library").JsonValue | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            sku: string;
            productId: string;
        }[];
    } & {
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
    }>;
    create(tenantId: string, actionUserId: string, dto: CreateProductDto): Promise<{
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
    }>;
    update(tenantId: string, id: string, actionUserId: string, dto: UpdateProductDto): Promise<{
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
    }>;
    delete(tenantId: string, id: string, actionUserId: string): Promise<{
        success: boolean;
    }>;
}
