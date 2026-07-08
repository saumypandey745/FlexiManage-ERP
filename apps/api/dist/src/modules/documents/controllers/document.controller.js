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
exports.DocumentController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const document_service_1 = require("../services/document.service");
const documents_dto_1 = require("../dto/documents.dto");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const tenant_guard_1 = require("../../../common/guards/tenant.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const auth_decorators_1 = require("../../../common/decorators/auth.decorators");
const swagger_1 = require("@nestjs/swagger");
let DocumentController = class DocumentController {
    constructor(docService) {
        this.docService = docService;
    }
    upload(req, file, dto) {
        return this.docService.uploadDocument(req.user.tenantId, req.user.id, file, dto.folderId, dto.description);
    }
    findAll(req, folderId) {
        return this.docService.getDocuments(req.user.tenantId, folderId);
    }
    search(req, dto) {
        return this.docService.searchDocuments(req.user.tenantId, dto.q || '');
    }
    findOne(req, id) {
        return this.docService.getDocument(req.user.tenantId, id);
    }
    update(req, id, dto) {
        return this.docService.updateDocument(req.user.tenantId, id, dto);
    }
    remove(req, id) {
        return this.docService.deleteDocument(req.user.tenantId, id, req.user.id);
    }
    share(req, id, dto) {
        return this.docService.shareDocument(req.user.tenantId, id, req.user.id, dto);
    }
    checkOut(req, id) {
        return this.docService.checkOutDocument(req.user.tenantId, id, req.user.id);
    }
    checkIn(req, id) {
        return this.docService.checkInDocument(req.user.tenantId, id, req.user.id);
    }
    download(req, id) {
        return this.docService.getSignedUrl(req.user.tenantId, id, req.user.id);
    }
};
exports.DocumentController = DocumentController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER', 'EMPLOYEE'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload a document' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, documents_dto_1.UploadDocumentDto]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "upload", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER', 'EMPLOYEE'),
    (0, swagger_1.ApiOperation)({ summary: 'List documents' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('folderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('search'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER', 'EMPLOYEE'),
    (0, swagger_1.ApiOperation)({ summary: 'Search documents' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, documents_dto_1.SearchDocumentDto]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER', 'EMPLOYEE'),
    (0, swagger_1.ApiOperation)({ summary: 'Get document details' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Update document' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, documents_dto_1.UpdateDocumentDto]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorators_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete document' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/share'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Share document' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, documents_dto_1.ShareDocumentDto]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "share", null);
__decorate([
    (0, common_1.Post)(':id/check-out'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER', 'EMPLOYEE'),
    (0, swagger_1.ApiOperation)({ summary: 'Lock document for editing' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "checkOut", null);
__decorate([
    (0, common_1.Post)(':id/check-in'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER', 'EMPLOYEE'),
    (0, swagger_1.ApiOperation)({ summary: 'Unlock document after editing' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "checkIn", null);
__decorate([
    (0, common_1.Get)(':id/download'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER', 'EMPLOYEE'),
    (0, swagger_1.ApiOperation)({ summary: 'Get document download URL' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "download", null);
exports.DocumentController = DocumentController = __decorate([
    (0, swagger_1.ApiTags)('documents'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, tenant_guard_1.TenantGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('documents'),
    __metadata("design:paramtypes", [document_service_1.DocumentService])
], DocumentController);
//# sourceMappingURL=document.controller.js.map