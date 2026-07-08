"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationModule = void 0;
const common_1 = require("@nestjs/common");
const organization_controller_1 = require("./organization.controller");
const organization_repository_1 = require("./organization.repository");
const branch_service_1 = require("./services/branch.service");
const department_service_1 = require("./services/department.service");
const team_service_1 = require("./services/team.service");
const settings_service_1 = require("./services/settings.service");
let OrganizationModule = class OrganizationModule {
};
exports.OrganizationModule = OrganizationModule;
exports.OrganizationModule = OrganizationModule = __decorate([
    (0, common_1.Module)({
        controllers: [organization_controller_1.OrganizationController],
        providers: [
            organization_repository_1.OrganizationRepository,
            branch_service_1.BranchService,
            department_service_1.DepartmentService,
            team_service_1.TeamService,
            settings_service_1.SettingsService,
        ],
        exports: [
            branch_service_1.BranchService,
            department_service_1.DepartmentService,
            team_service_1.TeamService,
            settings_service_1.SettingsService,
        ],
    })
], OrganizationModule);
//# sourceMappingURL=organization.module.js.map