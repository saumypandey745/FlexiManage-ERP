import { OrganizationRepository } from '../organization.repository';
import { CreateBranchDto, UpdateBranchDto } from '../dto/branch.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class BranchService {
    private readonly repo;
    private readonly prisma;
    constructor(repo: OrganizationRepository, prisma: PrismaService);
    getBranches(tenantId: string): Promise<{
        code: string;
        email: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        version: number;
        isHeadOffice: boolean;
        address: string | null;
        phone: string | null;
    }[]>;
    createBranch(tenantId: string, userId: string, dto: CreateBranchDto): Promise<{
        code: string;
        email: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        version: number;
        isHeadOffice: boolean;
        address: string | null;
        phone: string | null;
    }>;
    updateBranch(tenantId: string, branchId: string, userId: string, dto: UpdateBranchDto): Promise<{
        code: string;
        email: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        version: number;
        isHeadOffice: boolean;
        address: string | null;
        phone: string | null;
    }>;
    deleteBranch(tenantId: string, branchId: string, userId: string): Promise<{
        code: string;
        email: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        version: number;
        isHeadOffice: boolean;
        address: string | null;
        phone: string | null;
    }>;
}
