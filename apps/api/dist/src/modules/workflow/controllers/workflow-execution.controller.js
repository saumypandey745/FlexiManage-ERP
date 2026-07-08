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
exports.WorkflowExecutionController = void 0;
const common_1 = require("@nestjs/common");
const workflow_service_1 = require("../services/workflow.service");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const tenant_guard_1 = require("../../../common/guards/tenant.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const auth_decorators_1 = require("../../../common/decorators/auth.decorators");
const swagger_1 = require("@nestjs/swagger");
let WorkflowExecutionController = class WorkflowExecutionController {
    constructor(workflowService) {
        this.workflowService = workflowService;
    }
    getExecution(req, id) {
        return this.workflowService.getExecution(req.user.tenantId, id);
    }
    stopExecution(req, id) {
        return this.workflowService.stop(req.user.tenantId, id);
    }
};
exports.WorkflowExecutionController = WorkflowExecutionController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a workflow execution details' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], WorkflowExecutionController.prototype, "getExecution", null);
__decorate([
    (0, common_1.Post)(':id/stop'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Stop a workflow execution' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], WorkflowExecutionController.prototype, "stopExecution", null);
exports.WorkflowExecutionController = WorkflowExecutionController = __decorate([
    (0, swagger_1.ApiTags)('workflow-executions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, tenant_guard_1.TenantGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('workflow-executions'),
    __metadata("design:paramtypes", [workflow_service_1.WorkflowService])
], WorkflowExecutionController);
//# sourceMappingURL=workflow-execution.controller.js.map