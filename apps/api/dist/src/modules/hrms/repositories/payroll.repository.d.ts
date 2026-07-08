import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreatePayrollDto } from '../dto/hrms.dto';
export declare class PayrollRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findPayrolls(tenantId: string): Promise<({
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
    generatePayroll(tenantId: string, employeeId: string, dto: CreatePayrollDto): Promise<{
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
