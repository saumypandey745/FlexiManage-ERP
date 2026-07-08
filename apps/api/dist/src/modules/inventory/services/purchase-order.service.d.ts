import { PurchaseOrderRepository } from '../repositories/purchase-order.repository';
import { CreatePurchaseOrderDto, ReceivePurchaseOrderDto } from '../dto/inventory.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class PurchaseOrderService {
    private readonly repository;
    private readonly prisma;
    constructor(repository: PurchaseOrderRepository, prisma: PrismaService);
    findAll(tenantId: string): Promise<({
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
    findOne(tenantId: string, id: string): Promise<{
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
    create(tenantId: string, actionUserId: string, dto: CreatePurchaseOrderDto): Promise<{
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
    approve(tenantId: string, id: string, actionUserId: string): Promise<{
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
    receive(tenantId: string, id: string, actionUserId: string, dto: ReceivePurchaseOrderDto): Promise<{
        received: number;
        id: string;
        productId: string;
        quantity: number;
        poId: string;
        unitPrice: import("@prisma/client/runtime/library").Decimal;
    }>;
}
