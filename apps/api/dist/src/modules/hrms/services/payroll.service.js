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
exports.PayrollService = void 0;
const common_1 = require("@nestjs/common");
const payroll_repository_1 = require("../repositories/payroll.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let PayrollService = class PayrollService {
    constructor(repository, prisma) {
        this.repository = repository;
        this.prisma = prisma;
    }
    async findAll(tenantId) {
        return this.repository.findPayrolls(tenantId);
    }
    async generate(tenantId, actionUserId, employeeId, dto) {
        const payroll = await this.repository.generatePayroll(tenantId, employeeId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'CREATE',
                entityName: 'Payroll',
                entityId: payroll.id,
                newValues: { month: dto.month, year: dto.year },
            },
        });
        return payroll;
    }
};
exports.PayrollService = PayrollService;
exports.PayrollService = PayrollService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payroll_repository_1.PayrollRepository,
        prisma_service_1.PrismaService])
], PayrollService);
//# sourceMappingURL=payroll.service.js.map