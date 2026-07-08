import { LeaveService } from '../services/leave.service';
import { CreateLeaveDto, ApproveLeaveDto } from '../dto/hrms.dto';
export declare class LeaveController {
    private readonly leaveService;
    constructor(leaveService: LeaveService);
    create(req: any, employeeId: string, dto: CreateLeaveDto): Promise<{
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
    updateStatus(req: any, id: string, dto: ApproveLeaveDto): Promise<{
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
}
