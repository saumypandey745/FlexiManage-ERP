import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreatePurchaseOrderDto, ReceivePurchaseOrderDto } from '../dto/inventory.dto';
import { POStatus } from '@prisma/client';
export declare class PurchaseOrderRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findPurchaseOrders(tenantId: string): Promise<({
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
    findById(tenantId: string, id: string): Promise<({
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
    }) | null>;
    createPO(tenantId: string, actionUserId: string, dto: CreatePurchaseOrderDto): Promise<{
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
    updateStatus(tenantId: string, id: string, status: POStatus): Promise<{
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
    receivePO(tenantId: string, id: string, actionUserId: string, dto: ReceivePurchaseOrderDto): Promise<{
        received: number;
        id: string;
        productId: string;
        quantity: number;
        poId: string;
        unitPrice: import("@prisma/client/runtime/library").Decimal;
    }>;
}
