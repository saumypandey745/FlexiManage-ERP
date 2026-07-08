import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from '../dto/inventory.dto';
export declare class ProductRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findProducts(tenantId: string): Promise<({
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
    findById(tenantId: string, id: string): Promise<({
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
    }) | null>;
    createProduct(tenantId: string, dto: CreateProductDto): Promise<{
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
    updateProduct(tenantId: string, id: string, dto: UpdateProductDto): Promise<{
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
    deleteProduct(tenantId: string, id: string): Promise<{
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
}
