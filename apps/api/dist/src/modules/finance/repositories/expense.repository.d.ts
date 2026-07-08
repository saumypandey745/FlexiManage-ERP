import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateExpenseDto } from '../dto/finance.dto';
export declare class ExpenseRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findExpenses(tenantId: string): Promise<({
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
    createExpense(tenantId: string, userId: string, dto: CreateExpenseDto): Promise<{
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
