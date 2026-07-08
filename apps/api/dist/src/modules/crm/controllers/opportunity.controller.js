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
exports.OpportunityController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const tenant_guard_1 = require("../../../common/guards/tenant.guard");
const auth_decorators_1 = require("../../../common/decorators/auth.decorators");
const opportunity_service_1 = require("../services/opportunity.service");
const crm_dto_1 = require("../dto/crm.dto");
const client_1 = require("@prisma/client");
let OpportunityController = class OpportunityController {
    constructor(opportunityService) {
        this.opportunityService = opportunityService;
    }
    async getOpportunities(user) {
        return this.opportunityService.getOpportunities(user.tenantId);
    }
    async getOpportunity(user, id) {
        return this.opportunityService.getOpportunityById(user.tenantId, id);
    }
    async createOpportunity(user, dto) {
        return this.opportunityService.createOpportunity(user.tenantId, user.id, dto);
    }
    async updateOpportunity(user, id, dto) {
        return this.opportunityService.updateOpportunity(user.tenantId, id, user.id, dto);
    }
    async winOpportunity(user, id) {
        return this.opportunityService.setStage(user.tenantId, id, user.id, client_1.OpportunityStage.CLOSED_WON);
    }
    async loseOpportunity(user, id) {
        return this.opportunityService.setStage(user.tenantId, id, user.id, client_1.OpportunityStage.CLOSED_LOST);
    }
};
exports.OpportunityController = OpportunityController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List Opportunities' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OpportunityController.prototype, "getOpportunities", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Opportunity By ID' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OpportunityController.prototype, "getOpportunity", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create Opportunity' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, crm_dto_1.CreateOpportunityDto]),
    __metadata("design:returntype", Promise)
], OpportunityController.prototype, "createOpportunity", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Opportunity' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, crm_dto_1.UpdateOpportunityDto]),
    __metadata("design:returntype", Promise)
], OpportunityController.prototype, "updateOpportunity", null);
__decorate([
    (0, common_1.Patch)(':id/win'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark Opportunity as Won' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OpportunityController.prototype, "winOpportunity", null);
__decorate([
    (0, common_1.Patch)(':id/lose'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark Opportunity as Lost' }),
    __param(0, (0, auth_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OpportunityController.prototype, "loseOpportunity", null);
exports.OpportunityController = OpportunityController = __decorate([
    (0, swagger_1.ApiTags)('CRM - Opportunities'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, tenant_guard_1.TenantGuard),
    (0, common_1.Controller)('crm/opportunities'),
    __metadata("design:paramtypes", [opportunity_service_1.OpportunityService])
], OpportunityController);
//# sourceMappingURL=opportunity.controller.js.map