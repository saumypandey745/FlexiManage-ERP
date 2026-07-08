import { PayrollRepository } from '../repositories/payroll.repository';
import { CreatePayrollDto } from '../dto/hrms.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class PayrollService {
    private readonly repository;
    private readonly prisma;
    constructor(repository: PayrollRepository, prisma: PrismaService);
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
        status: import(".prisma/client").$Enums.PayrollStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        employeeId: string;
        month: number;
        year: number;
        basicSalary: import("@prisma/client/runtime/library").Decimal;
        netSalary: import("@prisma/client/runtime/library").Decimal;
    })[]>;
    generate(tenantId: string, actionUserId: string, employeeId: string, dto: CreatePayrollDto): Promise<{
        status: import(".prisma/client").$Enums.PayrollStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        employeeId: string;
        month: number;
        year: number;
        basicSalary: import("@prisma/client/runtime/library").Decimal;
        netSalary: import("@prisma/client/runtime/library").Decimal;
    }>;
}
