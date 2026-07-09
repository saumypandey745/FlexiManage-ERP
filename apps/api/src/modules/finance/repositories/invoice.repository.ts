import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { CreateInvoiceDto } from "../dto/finance.dto";
import { BaseException } from "../../../common/exceptions/base.exception";

@Injectable()
export class InvoiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findInvoices(tenantId: string) {
    return this.prisma.invoice.findMany({
      where: { tenantId, deletedAt: null },
      orderBy: { createdAt: "desc" },
      include: { customer: true },
    });
  }

  async findById(tenantId: string, id: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: { customer: true, lines: true, payments: true },
    });
    if (!invoice || invoice.tenantId !== tenantId || invoice.deletedAt)
      return null;
    return invoice;
  }

  async createInvoice(tenantId: string, dto: CreateInvoiceDto) {
    const existing = await this.prisma.invoice.findFirst({
      where: { tenantId, invoiceNumber: dto.invoiceNumber, deletedAt: null },
    });

    if (existing) {
      throw new BaseException(
        "Invoice number already exists",
        "FIN-INV-409",
        409
      );
    }

    const total = dto.lines.reduce(
      (acc, line) => acc + line.quantity * line.unitPrice,
      0
    );

    return this.prisma.invoice.create({
      data: {
        tenantId,
        customerId: dto.customerId,
        invoiceNumber: dto.invoiceNumber,
        issueDate: new Date(dto.issueDate),
        dueDate: new Date(dto.dueDate),
        subTotal: total,
        totalAmount: total, // basic implementation, no tax calc yet
        lines: {
          create: dto.lines.map((l) => ({
            description: l.description,
            quantity: l.quantity,
            unitPrice: l.unitPrice,
            totalAmount: l.quantity * l.unitPrice,
            taxRateId: l.taxRateId,
          })),
        },
      },
      include: { lines: true },
    });
  }

  async updateStatus(tenantId: string, id: string, status: any) {
    return this.prisma.invoice.update({
      where: { id, tenantId },
      data: { status },
    });
  }
}
