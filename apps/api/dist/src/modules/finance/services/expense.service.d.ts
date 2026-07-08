import { ExpenseRepository } from '../repositories/expense.repository';
import { CreateExpenseDto } from '../dto/finance.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class ExpenseService {
    private readonly repository;
    private readonly prisma;
    constructor(repository: ExpenseRepository, prisma: PrismaService);
    findAll(tenantId: string): Promise<({
        user: {
            status: import(".prisma/client").$Enums.UserStatus;
            email: string;
            id: string;
            tenantId: string;
            passwordHash: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
        category: {
            description: string | null;
            id: string;
            tenantId: string;
            name: string;
        };
    } & {
        status: import(".prisma/client").$Enums.ExpenseStatus;
        description: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        date: Date;
        categoryId: string;
        receiptUrl: string | null;
    })[]>;
    create(tenantId: string, actionUserId: string, dto: CreateExpenseDto): Promise<{
        category: {
            description: string | null;
            id: string;
            tenantId: string;
            name: string;
        };
    } & {
        status: import(".prisma/client").$Enums.ExpenseStatus;
        description: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        date: Date;
        categoryId: string;
        receiptUrl: string | null;
    }>;
}
