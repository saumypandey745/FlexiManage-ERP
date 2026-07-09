import { Injectable } from "@nestjs/common";
import { InvoiceRepository } from "../repositories/invoice.repository";
import { CreateInvoiceDto } from "../dto/finance.dto";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { BaseException } from "../../../common/exceptions/base.exception";
import { InvoiceStatus } from "@prisma/client";

@Injectable()
export class InvoiceService {
  constructor(
    private readonly repository: InvoiceRepository,
    private readonly prisma: PrismaService
  ) {}

  async findAll(tenantId: string) {
    return this.repository.findInvoices(tenantId);
  }

  async create(tenantId: string, actionUserId: string, dto: CreateInvoiceDto) {
    const invoice = await this.repository.createInvoice(tenantId, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: "CREATE",
        entityName: "Invoice",
        entityId: invoice.id,
        newValues: { invoiceNumber: dto.invoiceNumber },
      },
    });

    return invoice;
  }

  async send(tenantId: string, id: string, actionUserId: string) {
    const invoice = await this.repository.findById(tenantId, id);
    if (!invoice)
      throw new BaseException("Invoice not found", "FIN-INV-404", 404);
    if (invoice.status !== InvoiceStatus.DRAFT)
      throw new BaseException("Invoice is not a draft", "FIN-INV-400", 400);

    const updated = await this.repository.updateStatus(
      tenantId,
      id,
      InvoiceStatus.SENT
    );

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: "UPDATE",
        entityName: "Invoice",
        entityId: id,
        newValues: { status: InvoiceStatus.SENT },
      },
    });

    return updated;
  }
}
