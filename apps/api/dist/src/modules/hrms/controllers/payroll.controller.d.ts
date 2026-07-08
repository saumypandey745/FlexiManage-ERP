import { PayrollService } from '../services/payroll.service';
import { CreatePayrollDto } from '../dto/hrms.dto';
export declare class PayrollController {
    private readonly payrollService;
    constructor(payrollService: PayrollService);
    generate(req: any, employeeId: string, dto: CreatePayrollDto): Promise<{
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
}
