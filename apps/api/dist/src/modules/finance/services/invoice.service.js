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
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const invoice_repository_1 = require("../repositories/invoice.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const base_exception_1 = require("../../../common/exceptions/base.exception");
const client_1 = require("@prisma/client");
let InvoiceService = class InvoiceService {
    constructor(repository, prisma) {
        this.repository = repository;
        this.prisma = prisma;
    }
    async findAll(tenantId) {
        return this.repository.findInvoices(tenantId);
    }
    async create(tenantId, actionUserId, dto) {
        const invoice = await this.repository.createInvoice(tenantId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'CREATE',
                entityName: 'Invoice',
                entityId: invoice.id,
                newValues: { invoiceNumber: dto.invoiceNumber },
            },
        });
        return invoice;
    }
    async send(tenantId, id, actionUserId) {
        const invoice = await this.repository.findById(tenantId, id);
        if (!invoice)
            throw new base_exception_1.BaseException('Invoice not found', 'FIN-INV-404', 404);
        if (invoice.status !== client_1.InvoiceStatus.DRAFT)
            throw new base_exception_1.BaseException('Invoice is not a draft', 'FIN-INV-400', 400);
        const updated = await this.repository.updateStatus(tenantId, id, client_1.InvoiceStatus.SENT);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'UPDATE',
                entityName: 'Invoice',
                entityId: id,
                newValues: { status: client_1.InvoiceStatus.SENT },
            },
        });
        return updated;
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [invoice_repository_1.InvoiceRepository,
        prisma_service_1.PrismaService])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map