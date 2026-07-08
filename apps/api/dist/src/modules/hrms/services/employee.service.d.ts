import { EmployeeRepository } from '../repositories/employee.repository';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto/hrms.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class EmployeeService {
    private readonly repository;
    private readonly prisma;
    constructor(repository: EmployeeRepository, prisma: PrismaService);
    findAll(tenantId: string): Promise<({
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
    create(tenantId: string, actionUserId: string, dto: CreateEmployeeDto): Promise<{
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
    update(tenantId: string, id: string, actionUserId: string, dto: UpdateEmployeeDto): Promise<{
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
