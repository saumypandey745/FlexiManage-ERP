import { AttendanceRepository } from '../repositories/attendance.repository';
import { ClockInDto, ClockOutDto } from '../dto/hrms.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class AttendanceService {
    private readonly repository;
    private readonly prisma;
    constructor(repository: AttendanceRepository, prisma: PrismaService);
    findAll(tenantId: string): Promise<({
        employee: {
            status: import(".prisma/client").$Enums.EmployeeStatus;
            firstName: string;
            lastName: string;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            employeeCode: string;
            version: number;
            userId: string | null;
            managerId: string | null;
            departmentId: string | null;
        };
    } & {
        status: import(".prisma/client").$Enums.AttendanceStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        date: Date;
        employeeId: string;
        clockIn: Date;
        clockOut: Date | null;
        isLate: boolean;
    })[]>;
    clockIn(tenantId: string, actionUserId: string, dto: ClockInDto): Promise<{
        status: import(".prisma/client").$Enums.AttendanceStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        date: Date;
        employeeId: string;
        clockIn: Date;
        clockOut: Date | null;
        isLate: boolean;
    }>;
    clockOut(tenantId: string, actionUserId: string, dto: ClockOutDto): Promise<{
        status: import(".prisma/client").$Enums.AttendanceStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        date: Date;
        employeeId: string;
        clockIn: Date;
        clockOut: Date | null;
        isLate: boolean;
    }>;
}
