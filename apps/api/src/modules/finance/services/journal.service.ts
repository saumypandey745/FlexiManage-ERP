import { Injectable } from "@nestjs/common";
import { JournalRepository } from "../repositories/journal.repository";
import { CreateJournalEntryDto } from "../dto/finance.dto";
import { PrismaService } from "../../../common/prisma/prisma.service";

@Injectable()
export class JournalService {
  constructor(
    private readonly repository: JournalRepository,
    private readonly prisma: PrismaService
  ) {}

  async findAll(tenantId: string) {
    return this.repository.findEntries(tenantId);
  }

  async create(
    tenantId: string,
    actionUserId: string,
    dto: CreateJournalEntryDto
  ) {
    const entry = await this.repository.createEntry(tenantId, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: "CREATE",
        entityName: "JournalEntry",
        entityId: entry.id,
        newValues: { reference: dto.reference },
      },
    });

    return entry;
  }
}
