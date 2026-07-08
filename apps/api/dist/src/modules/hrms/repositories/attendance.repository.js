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
exports.AttendanceRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const base_exception_1 = require("../../../common/exceptions/base.exception");
let AttendanceRepository = class AttendanceRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAttendances(tenantId) {
        return this.prisma.attendance.findMany({
            where: { tenantId },
            orderBy: { date: 'desc' },
            include: { employee: true },
        });
    }
    async clockIn(tenantId, dto) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const existing = await this.prisma.attendance.findFirst({
            where: { tenantId, employeeId: dto.employeeId, date: today },
        });
        if (existing) {
            throw new base_exception_1.BaseException('Already clocked in today', 'HRMS-ATT-409', 409);
        }
        return this.prisma.attendance.create({
            data: {
                tenantId,
                employeeId: dto.employeeId,
                date: today,
                clockIn: new Date(),
            },
        });
    }
    async clockOut(tenantId, dto) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const existing = await this.prisma.attendance.findFirst({
            where: { tenantId, employeeId: dto.employeeId, date: today },
        });
        if (!existing) {
            throw new base_exception_1.BaseException('No active clock-in found', 'HRMS-ATT-404', 404);
        }
        if (existing.clockOut) {
            throw new base_exception_1.BaseException('Already clocked out', 'HRMS-ATT-400', 400);
        }
        return this.prisma.attendance.update({
            where: { id: existing.id },
            data: { clockOut: new Date() },
        });
    }
};
exports.AttendanceRepository = AttendanceRepository;
exports.AttendanceRepository = AttendanceRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AttendanceRepository);
//# sourceMappingURL=attendance.repository.js.map