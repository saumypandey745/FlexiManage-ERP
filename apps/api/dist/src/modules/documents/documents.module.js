"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const document_controller_1 = require("./controllers/document.controller");
const folder_controller_1 = require("./controllers/folder.controller");
const document_service_1 = require("./services/document.service");
const document_repository_1 = require("./repositories/document.repository");
const local_storage_provider_1 = require("./providers/local-storage.provider");
let DocumentsModule = class DocumentsModule {
};
exports.DocumentsModule = DocumentsModule;
exports.DocumentsModule = DocumentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                limits: {
                    fileSize: 1024 * 1024 * 50
                }
            })
        ],
        controllers: [
            document_controller_1.DocumentController,
            folder_controller_1.FolderController
        ],
        providers: [
            document_service_1.DocumentService,
            document_repository_1.DocumentRepository,
            {
                provide: 'StorageProvider',
                useClass: local_storage_provider_1.LocalStorageProvider
            }
        ],
        exports: [document_service_1.DocumentService]
    })
], DocumentsModule);
//# sourceMappingURL=documents.module.js.map