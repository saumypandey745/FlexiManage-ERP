import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { CreatePermissionDto, UpdatePermissionDto } from './dto/permission.dto';
export declare class RbacRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    createRole(tenantId: string, dto: CreateRoleDto): Promise<{
        id: string;
        tenantId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    updateRole(tenantId: string, roleId: string, dto: UpdateRoleDto): Promise<{
        id: string;
        tenantId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    deleteRole(tenantId: string, roleId: string): Promise<{
        id: string;
        tenantId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    getPermissions(): Promise<{
        id: string;
        action: string;
    }[]>;
    createPermission(dto: CreatePermissionDto): Promise<{
        id: string;
        action: string;
    }>;
    updatePermission(permissionId: string, dto: UpdatePermissionDto): Promise<{
        id: string;
        action: string;
    }>;
    deletePermission(permissionId: string): Promise<{
        id: string;
        action: string;
    }>;
    assignPermissionToRole(roleId: string, permissionId: string): Promise<{
        roleId: string;
        permissionId: string;
    }>;
    removePermissionFromRole(roleId: string, permissionId: string): Promise<{
        roleId: string;
        permissionId: string;
    }>;
    assignRoleToUser(userId: string, roleId: string): Promise<{
        roleId: string;
        userId: string;
    }>;
    removeRoleFromUser(userId: string, roleId: string): Promise<{
        roleId: string;
        userId: string;
    }>;
    getUserPermissions(userId: string): Promise<string[]>;
}
