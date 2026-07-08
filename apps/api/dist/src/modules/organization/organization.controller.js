"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const tenant_guard_1 = require("../../common/guards/tenant.guard");
const auth_decorators_1 = require("../../common/decorators/auth.decorators");
const branch_service_1 = require("./services/branch.service");
const department_service_1 = require("./services/department.service");
const team_service_1 = require("./services/team.service");
const settings_service_1 = require("./services/settings.service");
const branch_dto_1 = require("./dto/branch.dto");
const department_dto_1 = require("./dto/department.dto");
const team_dto_1 = require("./dto/team.dto");
const settings_dto_1 = require("./dto/settings.dto");
let OrganizationController = class OrganizationController {
    constructor(branchService, departmentService, teamService, settingsService) {
        this.branchService = branchService;
        this.departmentService = departmentService;
        this.teamService = teamService;
        this.settingsService = settingsService;
    }
    async getOrganizationInfo(user) {
        return this.settingsService.getOrganizationInfo(user.tenantId);
    }
    async updateSettings(user, dto) {
        return this.settingsService.updateSettings(user.tenantId, user.id, dto);
    }
    async updateProfile(user, dto) {
        return this.settingsService.updateBusinessProfile(user.tenantId, user.id, dto);
    }
    async getBranches(user) {
        return this.branchService.getBranches(user.tenantId);
    }
    async createBranch(user, dto) {
        return this.branchService.createBranch(user.tenantId, user.id, dto);
    }
    async updateBranch(user, id, dto) {
        return this.branchService.updateBranch(user.tenantId, id, user.id, dto);
    }
    async deleteBranch(user, id) {
        return this.branchService.deleteBranch(user.tenantId, id, user.id);
    }
    async getDepartments(user) {
        return this.departmentService.getDepartments(user.tenantId);
    }
    async createDepartment(user, dto) {
        return this.departmentService.createDepartment(user.tenantId, user.id, dto);
    }
    async updateDepartment(user, id, dto) {
        return this.departmentService.updateDepartment(user.tenantId, id, user.id, dto);
    }
    async deleteDepartment(user, id) {
        return this.departmentService.deleteDepartment(user.tenantId, id, user.id);
    }
    async getTeams(user) {
        return this.teamService.getTeams(user.tenantId);
    }
    async createTeam(user, dto) {
        return this.teamService.createTeam(user.tenantId, user.id, dto);
    }
    async updateTeam(user, id, dto) {
        return this.teamService.updateTeam(user.tenantId, id, user.id, dto);
    }
    async deleteTeam(user, id) {
        return this.teamService.deleteTeam(user.tenantId, id, user.id);
    }
};
exports.OrganizationController = OrganizationController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get Organization/Tenant profile info' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getOrganizationInfo", null);
__decorate([
    (0, common_1.Patch)('settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Organization Settings (Timezone, Currency)' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, settings_dto_1.OrganizationSettingsDto]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "updateSettings", null);
__decorate([
    (0, common_1.Patch)('profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Business Profile (GST, PAN, Address)' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, settings_dto_1.BusinessProfileDto]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('branches'),
    (0, swagger_1.ApiOperation)({ summary: 'List Branches' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getBranches", null);
__decorate([
    (0, common_1.Post)('branches'),
    (0, swagger_1.ApiOperation)({ summary: 'Create Branch' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, branch_dto_1.CreateBranchDto]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "createBranch", null);
__decorate([
    (0, common_1.Patch)('branches/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Branch' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, branch_dto_1.UpdateBranchDto]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "updateBranch", null);
__decorate([
    (0, common_1.Delete)('branches/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Branch (Soft)' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "deleteBranch", null);
__decorate([
    (0, common_1.Get)('departments'),
    (0, swagger_1.ApiOperation)({ summary: 'List Departments' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getDepartments", null);
__decorate([
    (0, common_1.Post)('departments'),
    (0, swagger_1.ApiOperation)({ summary: 'Create Department' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, department_dto_1.CreateDepartmentDto]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "createDepartment", null);
__decorate([
    (0, common_1.Patch)('departments/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Department' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, department_dto_1.UpdateDepartmentDto]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "updateDepartment", null);
__decorate([
    (0, common_1.Delete)('departments/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Department (Soft)' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "deleteDepartment", null);
__decorate([
    (0, common_1.Get)('teams'),
    (0, swagger_1.ApiOperation)({ summary: 'List Teams' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getTeams", null);
__decorate([
    (0, common_1.Post)('teams'),
    (0, swagger_1.ApiOperation)({ summary: 'Create Team' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, team_dto_1.CreateTeamDto]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "createTeam", null);
__decorate([
    (0, common_1.Patch)('teams/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Team' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, team_dto_1.UpdateTeamDto]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "updateTeam", null);
__decorate([
    (0, common_1.Delete)('teams/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Team (Soft)' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "deleteTeam", null);
exports.OrganizationController = OrganizationController = __decorate([
    (0, swagger_1.ApiTags)('Organization'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, tenant_guard_1.TenantGuard),
    (0, common_1.Controller)('organization'),
    __metadata("design:paramtypes", [branch_service_1.BranchService,
        department_service_1.DepartmentService,
        team_service_1.TeamService,
        settings_service_1.SettingsService])
], OrganizationController);
//# sourceMappingURL=organization.controller.js.map