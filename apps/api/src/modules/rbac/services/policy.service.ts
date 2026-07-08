import { Injectable } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';

/**
 * Enterprise Policy Engine
 * Evaluates complex attribute-based access control (ABAC) combined with RBAC.
 */
@Injectable()
export class PolicyService {
  constructor(private readonly auth: AuthorizationService) {}

  /**
   * Evaluate if a user can access a specific tenant resource.
   */
  async evaluateTenantAccess(userId: string, userTenantId: string, resourceTenantId: string): Promise<boolean> {
    // SuperAdmin bypass
    if (await this.auth.hasPermission(userId, 'system:admin')) {
      return true;
    }
    
    // Strict isolation
    return userTenantId === resourceTenantId;
  }

  /**
   * Evaluate if a user can mutate an employee record.
   * E.g., An employee can edit their own profile, or HR can edit anyone's profile.
   */
  async canEditEmployee(userId: string, targetUserId: string): Promise<boolean> {
    if (userId === targetUserId) {
      return true; // Self-edit
    }
    return this.auth.hasPermission(userId, 'employee:update');
  }
}
