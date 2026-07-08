import { RbacRepository } from '../rbac.repository';
import { CreateRoleDto, UpdateRoleDto } from '../dto/role.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class RoleService {
    private readonly repo;
    private readonly prisma;
    constructor(repo: RbacRepository, prisma: PrismaService);
    getRoles(tenantId: string): Promise<({
        permissions: ({
            permission: {
                id: string;
                action: string;
            };
        } & {
            roleId: string;
            permissionId: string;
        })[];
    } & {
        id: string;
        tenantId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    })[]>;
    createRole(tenantId: string, userId: string, dto: CreateRoleDto): Promise<{
        id: string;
        tenantId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    updateRole(tenantId: string, roleId: string, userId: string, dto: UpdateRoleDto): Promise<{
        id: string;
        tenantId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    deleteRole(tenantId: string, roleId: string, userId: string): Promise<{
        id: string;
        tenantId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
}
