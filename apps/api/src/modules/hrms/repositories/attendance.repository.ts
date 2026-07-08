import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { ClockInDto, ClockOutDto } from '../dto/hrms.dto';
import { BaseException } from '../../../common/exceptions/base.exception';

@Injectable()
export class AttendanceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAttendances(tenantId: string) {
    return this.prisma.attendance.findMany({
      where: { tenantId },
      orderBy: { date: 'desc' },
      include: { employee: true },
    });
  }

  async clockIn(tenantId: string, dto: ClockInDto) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await this.prisma.attendance.findFirst({
      where: { tenantId, employeeId: dto.employeeId, date: today },
    });

    if (existing) {
      throw new BaseException('Already clocked in today', 'HRMS-ATT-409', 409);
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

  async clockOut(tenantId: string, dto: ClockOutDto) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await this.prisma.attendance.findFirst({
      where: { tenantId, employeeId: dto.employeeId, date: today },
    });

    if (!existing) {
      throw new BaseException('No active clock-in found', 'HRMS-ATT-404', 404);
    }
    if (existing.clockOut) {
      throw new BaseException('Already clocked out', 'HRMS-ATT-400', 400);
    }

    return this.prisma.attendance.update({
      where: { id: existing.id },
      data: { clockOut: new Date() },
    });
  }
}
