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
exports.FolderController = void 0;
const common_1 = require("@nestjs/common");
const document_service_1 = require("../services/document.service");
const documents_dto_1 = require("../dto/documents.dto");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const tenant_guard_1 = require("../../../common/guards/tenant.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const auth_decorators_1 = require("../../../common/decorators/auth.decorators");
const swagger_1 = require("@nestjs/swagger");
let FolderController = class FolderController {
    constructor(docService) {
        this.docService = docService;
    }
    createFolder(req, dto) {
        return this.docService.createFolder(req.user.tenantId, dto);
    }
    getFolders(req, parentId) {
        return this.docService.getFolders(req.user.tenantId, parentId);
    }
    updateFolder(req, id, dto) {
        return this.docService.updateFolder(req.user.tenantId, id, dto);
    }
    deleteFolder(req, id) {
        return this.docService.deleteFolder(req.user.tenantId, id);
    }
};
exports.FolderController = FolderController;
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER', 'EMPLOYEE'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a folder' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, documents_dto_1.CreateFolderDto]),
    __metadata("design:returntype", void 0)
], FolderController.prototype, "createFolder", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER', 'EMPLOYEE'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all folders' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('parentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FolderController.prototype, "getFolders", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auth_decorators_1.Roles)('ADMIN', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Update folder' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, documents_dto_1.UpdateFolderDto]),
    __metadata("design:returntype", void 0)
], FolderController.prototype, "updateFolder", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorators_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete folder' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FolderController.prototype, "deleteFolder", null);
exports.FolderController = FolderController = __decorate([
    (0, swagger_1.ApiTags)('folders'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, tenant_guard_1.TenantGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('folders'),
    __metadata("design:paramtypes", [document_service_1.DocumentService])
], FolderController);
//# sourceMappingURL=folder.controller.js.map