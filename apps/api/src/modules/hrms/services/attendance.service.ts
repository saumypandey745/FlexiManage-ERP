import { Injectable } from '@nestjs/common';
import { AttendanceRepository } from '../repositories/attendance.repository';
import { ClockInDto, ClockOutDto } from '../dto/hrms.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly repository: AttendanceRepository,
    private readonly prisma: PrismaService,
  ) {}

  async findAll(tenantId: string) {
    return this.repository.findAttendances(tenantId);
  }

  async clockIn(tenantId: string, actionUserId: string, dto: ClockInDto) {
    const attendance = await this.repository.clockIn(tenantId, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: 'CREATE',
        entityName: 'Attendance',
        entityId: attendance.id,
        newValues: { action: 'CLOCK_IN' },
      },
    });

    return attendance;
  }

  async clockOut(tenantId: string, actionUserId: string, dto: ClockOutDto) {
    const attendance = await this.repository.clockOut(tenantId, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: 'UPDATE',
        entityName: 'Attendance',
        entityId: attendance.id,
        newValues: { action: 'CLOCK_OUT' },
      },
    });

    return attendance;
  }
}
