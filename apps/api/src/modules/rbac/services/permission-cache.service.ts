import { Injectable, Logger } from "@nestjs/common";
import { RedisCacheService } from "../../../common/cache/redis.service";
import { RbacRepository } from "../rbac.repository";

@Injectable()
export class PermissionCacheService {
  private readonly logger = new Logger(PermissionCacheService.name);
  private readonly CACHE_TTL = 3600; // 1 hour

  constructor(
    private readonly redis: RedisCacheService,
    private readonly repo: RbacRepository
  ) {}

  private getUserCacheKey(userId: string): string {
    return `permissions:user:${userId}`;
  }

  async getUserPermissions(userId: string): Promise<string[]> {
    const key = this.getUserCacheKey(userId);

    const cached = await this.redis.get<string[]>(key);
    if (cached) {
      return cached;
    }

    // Resolve from DB
    const permissions = await this.repo.getUserPermissions(userId);

    // Cache result
    await this.redis.set(key, permissions, this.CACHE_TTL);

    return permissions;
  }

  async invalidateUserPermissions(userId: string): Promise<void> {
    await this.redis.del(this.getUserCacheKey(userId));
    this.logger.debug(`Invalidated permission cache for user ${userId}`);
  }

  async invalidateRolePermissions(
    roleId: string,
    userIds: string[]
  ): Promise<void> {
    // In an enterprise system, you might index users by role in Redis to bulk invalidate,
    // or just invalidate the ones passed in if known.
    for (const userId of userIds) {
      await this.invalidateUserPermissions(userId);
    }
  }
}
