import { PermissionCacheService } from './permission-cache.service';
export declare class AuthorizationService {
    private readonly permissionCache;
    constructor(permissionCache: PermissionCacheService);
    hasPermission(userId: string, requiredPermission: string): Promise<boolean>;
    hasAllPermissions(userId: string, requiredPermissions: string[]): Promise<boolean>;
    hasAnyPermission(userId: string, requiredPermissions: string[]): Promise<boolean>;
    authorize(userId: string, requiredPermission: string): Promise<void>;
}
