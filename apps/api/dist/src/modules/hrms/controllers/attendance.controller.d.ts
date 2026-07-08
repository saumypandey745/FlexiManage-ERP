import { AttendanceService } from '../services/attendance.service';
import { ClockInDto, ClockOutDto } from '../dto/hrms.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    clockIn(req: any, dto: ClockInDto): Promise<{
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
    clockOut(req: any, dto: ClockOutDto): Promise<{
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
    findAll(req: any): Promise<({
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
}
