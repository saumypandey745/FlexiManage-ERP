import { PrismaService } from '../../../common/prisma/prisma.service';
import { ClockInDto, ClockOutDto } from '../dto/hrms.dto';
export declare class AttendanceRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAttendances(tenantId: string): Promise<({
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
    clockIn(tenantId: string, dto: ClockInDto): Promise<{
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
    clockOut(tenantId: string, dto: ClockOutDto): Promise<{
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
