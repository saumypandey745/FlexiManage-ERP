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
exports.JournalRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const base_exception_1 = require("../../../common/exceptions/base.exception");
let JournalRepository = class JournalRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findEntries(tenantId) {
        return this.prisma.journalEntry.findMany({
            where: { tenantId },
            orderBy: { createdAt: 'desc' },
            include: { lines: { include: { account: true } } },
        });
    }
    async createEntry(tenantId, dto) {
        let totalDebit = 0;
        let totalCredit = 0;
        for (const line of dto.lines) {
            totalDebit += line.debit || 0;
            totalCredit += line.credit || 0;
        }
        if (totalDebit !== totalCredit) {
            throw new base_exception_1.BaseException('Debits must equal Credits', 'FIN-JNL-400', 400);
        }
        return this.prisma.journalEntry.create({
            data: {
                tenantId,
                entryDate: new Date(dto.entryDate),
                reference: dto.reference,
                description: dto.description,
                lines: {
                    create: dto.lines.map(l => ({
                        accountId: l.accountId,
                        debit: l.debit || 0,
                        credit: l.credit || 0,
                    })),
                },
            },
            include: { lines: true },
        });
    }
};
exports.JournalRepository = JournalRepository;
exports.JournalRepository = JournalRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JournalRepository);
//# sourceMappingURL=journal.repository.js.map