import { JournalService } from '../services/journal.service';
import { CreateJournalEntryDto } from '../dto/finance.dto';
export declare class JournalController {
    private readonly journalService;
    constructor(journalService: JournalService);
    create(req: any, createDto: CreateJournalEntryDto): Promise<{
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
    findAll(req: any): Promise<({
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
}
