"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RbacModule = void 0;
const common_1 = require("@nestjs/common");
const rbac_controller_1 = require("./rbac.controller");
const rbac_service_1 = require("./rbac.service");
const rbac_repository_1 = require("./rbac.repository");
const role_service_1 = require("./services/role.service");
const permission_service_1 = require("./services/permission.service");
const authorization_service_1 = require("./services/authorization.service");
const policy_service_1 = require("./services/policy.service");
const permission_cache_service_1 = require("./services/permission-cache.service");
let RbacModule = class RbacModule {
};
exports.RbacModule = RbacModule;
exports.RbacModule = RbacModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        controllers: [rbac_controller_1.RbacController],
        providers: [
            rbac_repository_1.RbacRepository,
            rbac_service_1.RbacService,
            role_service_1.RoleService,
            permission_service_1.PermissionService,
            authorization_service_1.AuthorizationService,
            policy_service_1.PolicyService,
            permission_cache_service_1.PermissionCacheService,
        ],
        exports: [
            authorization_service_1.AuthorizationService,
            policy_service_1.PolicyService,
            permission_cache_service_1.PermissionCacheService,
        ],
    })
], RbacModule);
//# sourceMappingURL=rbac.module.js.map