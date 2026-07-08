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
exports.LeaveRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const base_exception_1 = require("../../../common/exceptions/base.exception");
const client_1 = require("@prisma/client");
let LeaveRepository = class LeaveRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findLeaves(tenantId) {
        return this.prisma.leaveRequest.findMany({
            where: { tenantId },
            orderBy: { createdAt: 'desc' },
            include: { employee: true, leaveType: true },
        });
    }
    async createLeave(tenantId, employeeId, dto) {
        const overlap = await this.prisma.leaveRequest.findFirst({
            where: {
                tenantId,
                employeeId,
                status: { notIn: [client_1.LeaveStatus.REJECTED, client_1.LeaveStatus.CANCELLED] },
                OR: [
                    { startDate: { lte: new Date(dto.endDate) }, endDate: { gte: new Date(dto.startDate) } },
                ],
            },
        });
        if (overlap) {
            throw new base_exception_1.BaseException('Leave request overlaps with existing leave', 'HRMS-LEV-409', 409);
        }
        return this.prisma.leaveRequest.create({
            data: {
                tenantId,
                employeeId,
                leaveTypeId: dto.leaveTypeId,
                startDate: new Date(dto.startDate),
                endDate: new Date(dto.endDate),
                reason: dto.reason,
            },
        });
    }
    async updateStatus(tenantId, id, approverId, dto) {
        const leave = await this.prisma.leaveRequest.findUnique({ where: { id } });
        if (!leave || leave.tenantId !== tenantId) {
            throw new base_exception_1.BaseException('Leave request not found', 'HRMS-LEV-404', 404);
        }
        return this.prisma.leaveRequest.update({
            where: { id },
            data: {
                status: dto.status,
                approvedById: approverId,
            },
        });
    }
};
exports.LeaveRepository = LeaveRepository;
exports.LeaveRepository = LeaveRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeaveRepository);
//# sourceMappingURL=leave.repository.js.map