import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { CreateJournalEntryDto } from "../dto/finance.dto";
import { BaseException } from "../../../common/exceptions/base.exception";

@Injectable()
export class JournalRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findEntries(tenantId: string) {
    return this.prisma.journalEntry.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" },
      include: { lines: { include: { account: true } } },
    });
  }

  async createEntry(tenantId: string, dto: CreateJournalEntryDto) {
    let totalDebit = 0;
    let totalCredit = 0;

    for (const line of dto.lines) {
      totalDebit += line.debit || 0;
      totalCredit += line.credit || 0;
    }

    if (totalDebit !== totalCredit) {
      throw new BaseException("Debits must equal Credits", "FIN-JNL-400", 400);
    }

    return this.prisma.journalEntry.create({
      data: {
        tenantId,
        entryDate: new Date(dto.entryDate),
        reference: dto.reference,
        description: dto.description,
        lines: {
          create: dto.lines.map((l) => ({
            accountId: l.accountId,
            debit: l.debit || 0,
            credit: l.credit || 0,
          })),
        },
      },
      include: { lines: true },
    });
  }
}
