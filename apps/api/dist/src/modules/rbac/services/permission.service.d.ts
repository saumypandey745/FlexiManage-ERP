import { RbacRepository } from '../rbac.repository';
import { CreatePermissionDto, UpdatePermissionDto } from '../dto/permission.dto';
export declare class PermissionService {
    private readonly repo;
    constructor(repo: RbacRepository);
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
}
