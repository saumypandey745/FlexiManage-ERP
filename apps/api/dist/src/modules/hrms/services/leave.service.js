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
exports.LeaveService = void 0;
const common_1 = require("@nestjs/common");
const leave_repository_1 = require("../repositories/leave.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let LeaveService = class LeaveService {
    constructor(repository, prisma) {
        this.repository = repository;
        this.prisma = prisma;
    }
    async findAll(tenantId) {
        return this.repository.findLeaves(tenantId);
    }
    async create(tenantId, actionUserId, employeeId, dto) {
        const leave = await this.repository.createLeave(tenantId, employeeId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'CREATE',
                entityName: 'LeaveRequest',
                entityId: leave.id,
                newValues: { leaveTypeId: dto.leaveTypeId },
            },
        });
        return leave;
    }
    async updateStatus(tenantId, id, actionUserId, dto) {
        const leave = await this.repository.updateStatus(tenantId, id, actionUserId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId: actionUserId,
                action: 'UPDATE',
                entityName: 'LeaveRequest',
                entityId: leave.id,
                newValues: { status: dto.status },
            },
        });
        return leave;
    }
};
exports.LeaveService = LeaveService;
exports.LeaveService = LeaveService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [leave_repository_1.LeaveRepository,
        prisma_service_1.PrismaService])
], LeaveService);
//# sourceMappingURL=leave.service.js.map