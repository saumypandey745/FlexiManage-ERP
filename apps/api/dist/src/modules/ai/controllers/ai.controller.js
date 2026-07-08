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
exports.AiController = void 0;
const common_1 = require("@nestjs/common");
const ai_service_1 = require("../services/ai.service");
const ai_dto_1 = require("../dto/ai.dto");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const tenant_guard_1 = require("../../../common/guards/tenant.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const auth_decorators_1 = require("../../../common/decorators/auth.decorators");
const swagger_1 = require("@nestjs/swagger");
const ai_vector_repository_1 = require("../repositories/ai-vector.repository");
const ai_gateway_service_1 = require("../providers/ai-gateway.service");
let AiController = class AiController {
    constructor(aiService, vectorRepo, gatewayService) {
        this.aiService = aiService;
        this.vectorRepo = vectorRepo;
        this.gatewayService = gatewayService;
    }
    chat(req, dto) {
        return this.aiService.chat(req.user.tenantId, req.user.id, dto);
    }
    createTemplate(req, dto) {
        return this.aiService.createTemplate(req.user.tenantId, dto);
    }
    getTemplates(req) {
        return this.aiService.getTemplates(req.user.tenantId);
    }
    getConversations(req) {
        return this.aiService.getConversations(req.user.tenantId, req.user.id);
    }
    getConversation(req, id) {
        return this.aiService.getConversation(req.user.tenantId, id);
    }
    deleteConversation(req, id) {
        return this.aiService.deleteConversation(req.user.tenantId, id);
    }
    async embedDocument(req, dto) {
        const doc = await this.vectorRepo.saveDocument(req.user.tenantId, dto);
        const provider = this.gatewayService.getProvider();
        const chunks = [dto.content.substring(0, 1000)];
        for (let i = 0; i < chunks.length; i++) {
            const vector = await provider.embed(chunks[i]);
            await this.vectorRepo.saveEmbedding(req.user.tenantId, doc.id, chunks[i], i, vector);
        }
        return { success: true, documentId: doc.id };
    }
    async semanticSearch(req, dto) {
        const provider = this.gatewayService.getProvider();
        const queryVector = await provider.embed(dto.query);
        return this.vectorRepo.similaritySearch(req.user.tenantId, queryVector, 5);
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.Post)('chat'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER', 'EMPLOYEE'),
    (0, swagger_1.ApiOperation)({ summary: 'Chat with AI' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ai_dto_1.ChatRequestDto]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "chat", null);
__decorate([
    (0, common_1.Post)('template'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a prompt template' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ai_dto_1.CreateTemplateDto]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Get)('templates'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER', 'EMPLOYEE'),
    (0, swagger_1.ApiOperation)({ summary: 'Get prompt templates' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "getTemplates", null);
__decorate([
    (0, common_1.Get)('conversations'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER', 'EMPLOYEE'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user conversations' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "getConversations", null);
__decorate([
    (0, common_1.Get)('conversations/:id'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER', 'EMPLOYEE'),
    (0, swagger_1.ApiOperation)({ summary: 'Get conversation details' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "getConversation", null);
__decorate([
    (0, common_1.Delete)('conversations/:id'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER', 'EMPLOYEE'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a conversation' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "deleteConversation", null);
__decorate([
    (0, common_1.Post)('embed'),
    (0, auth_decorators_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Embed a document' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ai_dto_1.EmbedDocumentDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "embedDocument", null);
__decorate([
    (0, common_1.Post)('search'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER', 'EMPLOYEE'),
    (0, swagger_1.ApiOperation)({ summary: 'Semantic search' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ai_dto_1.SemanticSearchDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "semanticSearch", null);
exports.AiController = AiController = __decorate([
    (0, swagger_1.ApiTags)('ai'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, tenant_guard_1.TenantGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('ai'),
    __metadata("design:paramtypes", [ai_service_1.AiService,
        ai_vector_repository_1.AiVectorRepository,
        ai_gateway_service_1.AiGatewayService])
], AiController);
//# sourceMappingURL=ai.controller.js.map