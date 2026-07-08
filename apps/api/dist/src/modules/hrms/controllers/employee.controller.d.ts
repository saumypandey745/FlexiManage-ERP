import { EmployeeService } from '../services/employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto/hrms.dto';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    create(req: any, createDto: CreateEmployeeDto): Promise<{
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
    findAll(req: any): Promise<({
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
    update(req: any, id: string, updateDto: UpdateEmployeeDto): Promise<{
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
