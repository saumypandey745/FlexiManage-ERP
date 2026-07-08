import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateJournalEntryDto } from '../dto/finance.dto';
export declare class JournalRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findEntries(tenantId: string): Promise<({
        lines: ({
            account: {
                code: string;
                type: import(".prisma/client").$Enums.LedgerAccountType;
                id: string;
                tenantId: string;
                name: string;
            };
        } & {
            id: string;
            accountId: string;
            debit: import("@prisma/client/runtime/library").Decimal;
            credit: import("@prisma/client/runtime/library").Decimal;
            entryId: string;
        })[];
    } & {
        description: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        reference: string;
        entryDate: Date;
    })[]>;
    createEntry(tenantId: string, dto: CreateJournalEntryDto): Promise<{
        lines: {
            id: string;
            accountId: string;
            debit: import("@prisma/client/runtime/library").Decimal;
            credit: import("@prisma/client/runtime/library").Decimal;
            entryId: string;
        }[];
    } & {
        description: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        reference: string;
        entryDate: Date;
    }>;
}
