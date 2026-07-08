import { ExpenseService } from '../services/expense.service';
import { CreateExpenseDto } from '../dto/finance.dto';
export declare class ExpenseController {
    private readonly expenseService;
    constructor(expenseService: ExpenseService);
    create(req: any, createDto: CreateExpenseDto): Promise<{
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
    findAll(req: any): Promise<({
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
}
