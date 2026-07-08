import { ProductService } from '../services/product.service';
import { CreateProductDto, UpdateProductDto } from '../dto/inventory.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(req: any, createDto: CreateProductDto): Promise<{
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
    findAll(req: any): Promise<({
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
    findOne(req: any, id: string): Promise<{
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
    update(req: any, id: string, updateDto: UpdateProductDto): Promise<{
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
    remove(req: any, id: string): Promise<{
        success: boolean;
    }>;
}
