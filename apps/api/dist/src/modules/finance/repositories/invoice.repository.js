"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const base_exception_1 = require("../../../common/exceptions/base.exception");
let InvoiceRepository = class InvoiceRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findInvoices(tenantId) {
        return this.prisma.invoice.findMany({
            where: { tenantId, deletedAt: null },
            orderBy: { createdAt: 'desc' },
            include: { customer: true },
        });
    }
    async findById(tenantId, id) {
        const invoice = await this.prisma.invoice.findUnique({
            where: { id },
            include: { customer: true, lines: true, payments: true },
        });
        if (!invoice || invoice.tenantId !== tenantId || invoice.deletedAt)
            return null;
        return invoice;
    }
    async createInvoice(tenantId, dto) {
        const existing = await this.prisma.invoice.findFirst({
            where: { tenantId, invoiceNumber: dto.invoiceNumber, deletedAt: null },
        });
        if (existing) {
            throw new base_exception_1.BaseException('Invoice number already exists', 'FIN-INV-409', 409);
        }
        const total = dto.lines.reduce((acc, line) => acc + (line.quantity * line.unitPrice), 0);
        return this.prisma.invoice.create({
            data: {
                tenantId,
                customerId: dto.customerId,
                invoiceNumber: dto.invoiceNumber,
                issueDate: new Date(dto.issueDate),
                dueDate: new Date(dto.dueDate),
                subTotal: total,
                totalAmount: total,
                lines: {
                    create: dto.lines.map(l => ({
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
    async updateStatus(tenantId, id, status) {
        return this.prisma.invoice.update({
            where: { id, tenantId },
            data: { status },
        });
    }
};
exports.InvoiceRepository = InvoiceRepository;
exports.InvoiceRepository = InvoiceRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvoiceRepository);
//# sourceMappingURL=invoice.repository.js.map