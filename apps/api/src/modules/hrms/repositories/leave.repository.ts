import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { CreateLeaveDto, ApproveLeaveDto } from "../dto/hrms.dto";
import { BaseException } from "../../../common/exceptions/base.exception";
import { LeaveStatus } from "@prisma/client";

@Injectable()
export class LeaveRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findLeaves(tenantId: string) {
    return this.prisma.leaveRequest.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" },
      include: { employee: true, leaveType: true },
    });
  }

  async createLeave(tenantId: string, employeeId: string, dto: CreateLeaveDto) {
    // Check overlaps
    const overlap = await this.prisma.leaveRequest.findFirst({
      where: {
        tenantId,
        employeeId,
        status: { notIn: [LeaveStatus.REJECTED, LeaveStatus.CANCELLED] },
        OR: [
          {
            startDate: { lte: new Date(dto.endDate) },
            endDate: { gte: new Date(dto.startDate) },
          },
        ],
      },
    });

    if (overlap) {
      throw new BaseException(
        "Leave request overlaps with existing leave",
        "HRMS-LEV-409",
        409
      );
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

  async updateStatus(
    tenantId: string,
    id: string,
    approverId: string,
    dto: ApproveLeaveDto
  ) {
    const leave = await this.prisma.leaveRequest.findUnique({ where: { id } });
    if (!leave || leave.tenantId !== tenantId) {
      throw new BaseException("Leave request not found", "HRMS-LEV-404", 404);
    }

    return this.prisma.leaveRequest.update({
      where: { id },
      data: {
        status: dto.status,
        approvedById: approverId,
      },
    });
  }
}
