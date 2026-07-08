import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto/hrms.dto';
export declare class EmployeeRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findEmployees(tenantId: string): Promise<({
        department: {
            code: string;
            description: string | null;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            version: number;
            branchId: string | null;
        } | null;
        profile: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            address: string | null;
            phone: string | null;
            employeeId: string;
            dateOfBirth: Date | null;
            joiningDate: Date | null;
        } | null;
    } & {
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
    })[]>;
    findById(tenantId: string, id: string): Promise<({
        department: {
            code: string;
            description: string | null;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            version: number;
            branchId: string | null;
        } | null;
        profile: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            address: string | null;
            phone: string | null;
            employeeId: string;
            dateOfBirth: Date | null;
            joiningDate: Date | null;
        } | null;
    } & {
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
    }) | null>;
    createEmployee(tenantId: string, dto: CreateEmployeeDto): Promise<{
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
    }>;
    updateEmployee(tenantId: string, id: string, dto: UpdateEmployeeDto): Promise<{
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
    }>;
}
