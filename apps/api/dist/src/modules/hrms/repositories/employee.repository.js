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
exports.EmployeeRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const base_exception_1 = require("../../../common/exceptions/base.exception");
let EmployeeRepository = class EmployeeRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findEmployees(tenantId) {
        return this.prisma.employee.findMany({
            where: { tenantId, deletedAt: null },
            orderBy: { createdAt: 'desc' },
            include: { profile: true, department: true },
        });
    }
    async findById(tenantId, id) {
        const employee = await this.prisma.employee.findUnique({
            where: { id },
            include: { profile: true, department: true },
        });
        if (!employee || employee.tenantId !== tenantId || employee.deletedAt)
            return null;
        return employee;
    }
    async createEmployee(tenantId, dto) {
        const existing = await this.prisma.employee.findFirst({
            where: { tenantId, employeeCode: dto.employeeCode, deletedAt: null },
        });
        if (existing) {
            throw new base_exception_1.BaseException('Employee code already exists', 'HRMS-EMP-409', 409);
        }
        return this.prisma.employee.create({
            data: {
                tenantId,
                employeeCode: dto.employeeCode,
                firstName: dto.firstName,
                lastName: dto.lastName,
                status: dto.status,
            },
        });
    }
    async updateEmployee(tenantId, id, dto) {
        const existing = await this.findById(tenantId, id);
        if (!existing) {
            throw new base_exception_1.BaseException('Employee not found', 'HRMS-EMP-404', 404);
        }
        return this.prisma.employee.update({
            where: { id },
            data: dto,
        });
    }
};
exports.EmployeeRepository = EmployeeRepository;
exports.EmployeeRepository = EmployeeRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmployeeRepository);
//# sourceMappingURL=employee.repository.js.map