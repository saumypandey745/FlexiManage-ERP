import { Module, Global } from "@nestjs/common";
import { RbacController } from "./rbac.controller";
import { RbacService } from "./rbac.service";
import { RbacRepository } from "./rbac.repository";
import { RoleService } from "./services/role.service";
import { PermissionService } from "./services/permission.service";
import { AuthorizationService } from "./services/authorization.service";
import { PolicyService } from "./services/policy.service";
import { PermissionCacheService } from "./services/permission-cache.service";

@Global()
@Module({
  controllers: [RbacController],
  providers: [
    RbacRepository,
    RbacService,
    RoleService,
    PermissionService,
    AuthorizationService,
    PolicyService,
    PermissionCacheService,
  ],
  exports: [AuthorizationService, PolicyService, PermissionCacheService],
})
export class RbacModule {}
