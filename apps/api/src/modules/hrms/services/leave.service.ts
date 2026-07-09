import { Injectable } from "@nestjs/common";
import { LeaveRepository } from "../repositories/leave.repository";
import { CreateLeaveDto, ApproveLeaveDto } from "../dto/hrms.dto";
import { PrismaService } from "../../../common/prisma/prisma.service";

@Injectable()
export class LeaveService {
  constructor(
    private readonly repository: LeaveRepository,
    private readonly prisma: PrismaService
  ) {}

  async findAll(tenantId: string) {
    return this.repository.findLeaves(tenantId);
  }

  async create(
    tenantId: string,
    actionUserId: string,
    employeeId: string,
    dto: CreateLeaveDto
  ) {
    const leave = await this.repository.createLeave(tenantId, employeeId, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: "CREATE",
        entityName: "LeaveRequest",
        entityId: leave.id,
        newValues: { leaveTypeId: dto.leaveTypeId },
      },
    });

    return leave;
  }

  async updateStatus(
    tenantId: string,
    id: string,
    actionUserId: string,
    dto: ApproveLeaveDto
  ) {
    const leave = await this.repository.updateStatus(
      tenantId,
      id,
      actionUserId,
      dto
    );

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: "UPDATE",
        entityName: "LeaveRequest",
        entityId: leave.id,
        newValues: { status: dto.status },
      },
    });

    return leave;
  }
}
