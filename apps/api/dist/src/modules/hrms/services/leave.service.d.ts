import { LeaveRepository } from '../repositories/leave.repository';
import { CreateLeaveDto, ApproveLeaveDto } from '../dto/hrms.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class LeaveService {
    private readonly repository;
    private readonly prisma;
    constructor(repository: LeaveRepository, prisma: PrismaService);
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
    create(tenantId: string, actionUserId: string, employeeId: string, dto: CreateLeaveDto): Promise<{
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
    updateStatus(tenantId: string, id: string, actionUserId: string, dto: ApproveLeaveDto): Promise<{
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
