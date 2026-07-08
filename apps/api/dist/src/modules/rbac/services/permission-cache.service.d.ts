import { RedisCacheService } from '../../../common/cache/redis.service';
import { RbacRepository } from '../rbac.repository';
export declare class PermissionCacheService {
    private readonly redis;
    private readonly repo;
    private readonly logger;
    private readonly CACHE_TTL;
    constructor(redis: RedisCacheService, repo: RbacRepository);
    private getUserCacheKey;
    getUserPermissions(userId: string): Promise<string[]>;
    invalidateUserPermissions(userId: string): Promise<void>;
    invalidateRolePermissions(roleId: string, userIds: string[]): Promise<void>;
}
