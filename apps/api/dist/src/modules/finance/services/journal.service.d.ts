import { JournalRepository } from '../repositories/journal.repository';
import { CreateJournalEntryDto } from '../dto/finance.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class JournalService {
    private readonly repository;
    private readonly prisma;
    constructor(repository: JournalRepository, prisma: PrismaService);
    findAll(tenantId: string): Promise<({
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
    create(tenantId: string, actionUserId: string, dto: CreateJournalEntryDto): Promise<{
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
