import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateLeaveDto, ApproveLeaveDto } from '../dto/hrms.dto';
export declare class LeaveRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findLeaves(tenantId: string): Promise<({
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
        leaveType: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            defaultDays: number;
            isPaid: boolean;
        };
    } & {
        status: import(".prisma/client").$Enums.LeaveStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        reason: string | null;
        employeeId: string;
        leaveTypeId: string;
        startDate: Date;
        endDate: Date;
        approvedById: string | null;
    })[]>;
    createLeave(tenantId: string, employeeId: string, dto: CreateLeaveDto): Promise<{
        status: import(".prisma/client").$Enums.LeaveStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        reason: string | null;
        employeeId: string;
        leaveTypeId: string;
        startDate: Date;
        endDate: Date;
        approvedById: string | null;
    }>;
    updateStatus(tenantId: string, id: string, approverId: string, dto: ApproveLeaveDto): Promise<{
        status: import(".prisma/client").$Enums.LeaveStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        reason: string | null;
        employeeId: string;
        leaveTypeId: string;
        startDate: Date;
        endDate: Date;
        approvedById: string | null;
    }>;
}
