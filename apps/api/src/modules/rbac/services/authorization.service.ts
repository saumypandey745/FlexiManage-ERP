import { Injectable, ForbiddenException } from "@nestjs/common";
import { PermissionCacheService } from "./permission-cache.service";

@Injectable()
export class AuthorizationService {
  constructor(private readonly permissionCache: PermissionCacheService) {}

  /**
   * Check if a user has a specific permission.
   * Format: 'module:action' (e.g., 'employee:create')
   */
  async hasPermission(
    userId: string,
    requiredPermission: string
  ): Promise<boolean> {
    const permissions = await this.permissionCache.getUserPermissions(userId);

    // Check for exact match or wildcard matches if we support them
    // E.g., 'employee:*' matches 'employee:create'
    if (permissions.includes("*") || permissions.includes("*:*")) {
      return true;
    }

    const [reqMod, reqAct] = requiredPermission.split(":");

    for (const p of permissions) {
      if (p === requiredPermission) return true;

      const [mod, act] = p.split(":");
      if (mod === reqMod && act === "*") return true;
    }

    return false;
  }

  /**
   * Check if a user has ALL of the required permissions.
   */
  async hasAllPermissions(
    userId: string,
    requiredPermissions: string[]
  ): Promise<boolean> {
    for (const req of requiredPermissions) {
      const has = await this.hasPermission(userId, req);
      if (!has) return false;
    }
    return true;
  }

  /**
   * Check if a user has ANY of the required permissions.
   */
  async hasAnyPermission(
    userId: string,
    requiredPermissions: string[]
  ): Promise<boolean> {
    for (const req of requiredPermissions) {
      const has = await this.hasPermission(userId, req);
      if (has) return true;
    }
    return false;
  }

  /**
   * Throw exception if permission is missing.
   */
  async authorize(userId: string, requiredPermission: string): Promise<void> {
    const has = await this.hasPermission(userId, requiredPermission);
    if (!has) {
      throw new ForbiddenException(
        `Missing required permission: ${requiredPermission}`
      );
    }
  }
}
