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
exports.DocumentService = void 0;
const common_1 = require("@nestjs/common");
const document_repository_1 = require("../repositories/document.repository");
const crypto = require("crypto");
const path_1 = require("path");
let DocumentService = class DocumentService {
    constructor(repo, storage) {
        this.repo = repo;
        this.storage = storage;
    }
    async createFolder(tenantId, dto) {
        return this.repo.createFolder(tenantId, dto);
    }
    async getFolders(tenantId, parentId) {
        return this.repo.getFolders(tenantId, parentId);
    }
    async updateFolder(tenantId, id, dto) {
        return this.repo.updateFolder(tenantId, id, dto);
    }
    async deleteFolder(tenantId, id) {
        return this.repo.deleteFolder(tenantId, id);
    }
    async uploadDocument(tenantId, userId, file, folderId, description) {
        if (!file)
            throw new common_1.BadRequestException('File is required');
        const extension = (0, path_1.extname)(file.originalname).replace('.', '');
        const key = `${tenantId}/${new Date().getTime()}-${crypto.randomBytes(4).toString('hex')}.${extension}`;
        await this.storage.uploadFile(key, file.buffer, file.mimetype);
        const checksum = crypto.createHash('sha256').update(file.buffer).digest('hex');
        const documentData = {
            folderId,
            title: file.originalname,
            description,
            fileSize: file.size,
            mimeType: file.mimetype,
            extension,
            checksum,
            storageKey: key,
            storageProvider: 'LOCAL'
        };
        const doc = await this.repo.createDocument(tenantId, documentData);
        await this.repo.logAudit(tenantId, doc.id, userId, 'UPLOAD');
        return doc;
    }
    async getDocument(tenantId, id) {
        const doc = await this.repo.getDocument(tenantId, id);
        if (!doc)
            throw new common_1.NotFoundException('Document not found');
        return doc;
    }
    async getDocuments(tenantId, folderId) {
        return this.repo.getDocuments(tenantId, folderId);
    }
    async updateDocument(tenantId, id, dto) {
        return this.repo.updateDocument(tenantId, id, dto);
    }
    async deleteDocument(tenantId, id, userId) {
        const doc = await this.repo.deleteDocument(tenantId, id);
        await this.repo.logAudit(tenantId, id, userId, 'DELETE');
        return doc;
    }
    async searchDocuments(tenantId, query) {
        return this.repo.search(tenantId, query);
    }
    async getSignedUrl(tenantId, id, userId) {
        const doc = await this.getDocument(tenantId, id);
        const url = await this.storage.getSignedUrl(doc.storageKey);
        await this.repo.logAudit(tenantId, id, userId, 'DOWNLOAD');
        return { url };
    }
    async checkOutDocument(tenantId, id, userId) {
        const doc = await this.getDocument(tenantId, id);
        if (doc.locks && doc.locks.length > 0) {
            throw new common_1.BadRequestException('Document is already locked by another user');
        }
        await this.repo.lockDocument(tenantId, id, userId);
        await this.repo.logAudit(tenantId, id, userId, 'CHECKOUT');
        return { success: true, message: 'Document locked for editing' };
    }
    async checkInDocument(tenantId, id, userId) {
        await this.repo.unlockDocument(tenantId, id);
        await this.repo.logAudit(tenantId, id, userId, 'CHECKIN');
        return { success: true, message: 'Document unlocked' };
    }
    async shareDocument(tenantId, id, userId, dto) {
        const share = await this.repo.shareDocument(tenantId, id, dto.permission, dto.sharedWithId, dto.sharedWithEmail);
        await this.repo.logAudit(tenantId, id, userId, 'SHARE', { shareId: share.id });
        return share;
    }
};
exports.DocumentService = DocumentService;
exports.DocumentService = DocumentService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('StorageProvider')),
    __metadata("design:paramtypes", [document_repository_1.DocumentRepository, Object])
], DocumentService);
//# sourceMappingURL=document.service.js.map