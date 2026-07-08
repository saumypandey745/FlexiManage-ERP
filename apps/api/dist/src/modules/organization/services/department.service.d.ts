import { OrganizationRepository } from '../organization.repository';
import { CreateDepartmentDto, UpdateDepartmentDto } from '../dto/department.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class DepartmentService {
    private readonly repo;
    private readonly prisma;
    constructor(repo: OrganizationRepository, prisma: PrismaService);
    getDepartments(tenantId: string): Promise<{
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
    }[]>;
    createDepartment(tenantId: string, userId: string, dto: CreateDepartmentDto): Promise<{
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
    }>;
    updateDepartment(tenantId: string, departmentId: string, userId: string, dto: UpdateDepartmentDto): Promise<{
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
    }>;
    deleteDepartment(tenantId: string, departmentId: string, userId: string): Promise<{
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
    }>;
}
