import { PurchaseOrderService } from '../services/purchase-order.service';
import { CreatePurchaseOrderDto, ReceivePurchaseOrderDto } from '../dto/inventory.dto';
export declare class PurchaseOrderController {
    private readonly poService;
    constructor(poService: PurchaseOrderService);
    create(req: any, createDto: CreatePurchaseOrderDto): Promise<{
        status: import(".prisma/client").$Enums.POStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        poNumber: string;
        supplierId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        expectedDate: Date | null;
        createdById: string;
    }>;
    findAll(req: any): Promise<({
        supplier: {
            code: string;
            email: string | null;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            address: string | null;
            phone: string | null;
            rating: number;
        };
        createdBy: {
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
        status: import(".prisma/client").$Enums.POStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        poNumber: string;
        supplierId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        expectedDate: Date | null;
        createdById: string;
    })[]>;
    findOne(req: any, id: string): Promise<{
        supplier: {
            code: string;
            email: string | null;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            address: string | null;
            phone: string | null;
            rating: number;
        };
        createdBy: {
            status: import(".prisma/client").$Enums.UserStatus;
            email: string;
            id: string;
            tenantId: string;
            passwordHash: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
        lines: {
            received: number;
            id: string;
            productId: string;
            quantity: number;
            poId: string;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        status: import(".prisma/client").$Enums.POStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        poNumber: string;
        supplierId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        expectedDate: Date | null;
        createdById: string;
    }>;
    approve(req: any, id: string): Promise<{
        status: import(".prisma/client").$Enums.POStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        poNumber: string;
        supplierId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        expectedDate: Date | null;
        createdById: string;
    }>;
    receive(req: any, id: string, dto: ReceivePurchaseOrderDto): Promise<{
        received: number;
        id: string;
        productId: string;
        quantity: number;
        poId: string;
        unitPrice: import("@prisma/client/runtime/library").Decimal;
    }>;
}
