import { AuthorizationService } from './authorization.service';
export declare class PolicyService {
    private readonly auth;
    constructor(auth: AuthorizationService);
    evaluateTenantAccess(userId: string, userTenantId: string, resourceTenantId: string): Promise<boolean>;
    canEditEmployee(userId: string, targetUserId: string): Promise<boolean>;
}
