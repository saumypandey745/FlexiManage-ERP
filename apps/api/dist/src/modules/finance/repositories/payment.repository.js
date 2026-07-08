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
exports.PaymentRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const base_exception_1 = require("../../../common/exceptions/base.exception");
const client_1 = require("@prisma/client");
let PaymentRepository = class PaymentRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findPayments(tenantId) {
        return this.prisma.payment.findMany({
            where: { tenantId },
            orderBy: { createdAt: 'desc' },
            include: { invoice: true },
        });
    }
    async processPayment(tenantId, dto) {
        return this.prisma.$transaction(async (tx) => {
            const invoice = await tx.invoice.findUnique({
                where: { id: dto.invoiceId },
            });
            if (!invoice || invoice.tenantId !== tenantId) {
                throw new base_exception_1.BaseException('Invoice not found', 'FIN-PAY-404', 404);
            }
            if (Number(invoice.amountPaid) + dto.amount > Number(invoice.totalAmount)) {
                throw new base_exception_1.BaseException('Payment exceeds invoice amount', 'FIN-PAY-400', 400);
            }
            const payment = await tx.payment.create({
                data: {
                    tenantId,
                    invoiceId: dto.invoiceId,
                    amount: dto.amount,
                    method: dto.method,
                    paymentDate: new Date(dto.paymentDate),
                    reference: dto.reference,
                },
            });
            const newPaid = Number(invoice.amountPaid) + dto.amount;
            const status = newPaid >= Number(invoice.totalAmount) ? client_1.InvoiceStatus.PAID : client_1.InvoiceStatus.PARTIAL;
            await tx.invoice.update({
                where: { id: invoice.id },
                data: { amountPaid: newPaid, status },
            });
            return payment;
        });
    }
};
exports.PaymentRepository = PaymentRepository;
exports.PaymentRepository = PaymentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentRepository);
//# sourceMappingURL=payment.repository.js.map