import { RoleService } from './services/role.service';
import { PermissionService } from './services/permission.service';
import { RbacService } from './rbac.service';
import { PermissionCacheService } from './services/permission-cache.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { CreatePermissionDto, UpdatePermissionDto } from './dto/permission.dto';
export declare class RbacController {
    private readonly roleService;
    private readonly permissionService;
    private readonly rbacService;
    private readonly cache;
    constructor(roleService: RoleService, permissionService: PermissionService, rbacService: RbacService, cache: PermissionCacheService);
    getRoles(user: any): Promise<({
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
    createRole(user: any, dto: CreateRoleDto): Promise<{
        id: string;
        tenantId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    updateRole(user: any, id: string, dto: UpdateRoleDto): Promise<{
        id: string;
        tenantId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    deleteRole(user: any, id: string): Promise<{
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
    updatePermission(id: string, dto: UpdatePermissionDto): Promise<{
        id: string;
        action: string;
    }>;
    deletePermission(id: string): Promise<{
        id: string;
        action: string;
    }>;
    assignPermissionToRole(user: any, roleId: string, permissionId: string): Promise<{
        roleId: string;
        permissionId: string;
    }>;
    removePermissionFromRole(user: any, roleId: string, permissionId: string): Promise<{
        roleId: string;
        permissionId: string;
    }>;
    assignRoleToUser(user: any, targetUserId: string, roleId: string): Promise<{
        roleId: string;
        userId: string;
    }>;
    removeRoleFromUser(user: any, targetUserId: string, roleId: string): Promise<{
        roleId: string;
        userId: string;
    }>;
    getMyPermissions(user: any): Promise<string[]>;
}
