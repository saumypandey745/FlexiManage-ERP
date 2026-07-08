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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let DocumentRepository = class DocumentRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createFolder(tenantId, dto) {
        return this.prisma.folder.create({
            data: {
                tenantId,
                name: dto.name,
                parentId: dto.parentId
            }
        });
    }
    async getFolders(tenantId, parentId) {
        return this.prisma.folder.findMany({
            where: { tenantId, parentId: parentId || null, deletedAt: null }
        });
    }
    async updateFolder(tenantId, id, dto) {
        return this.prisma.folder.update({
            where: { id, tenantId },
            data: dto
        });
    }
    async deleteFolder(tenantId, id) {
        return this.prisma.folder.update({
            where: { id, tenantId },
            data: { deletedAt: new Date() }
        });
    }
    async createDocument(tenantId, data) {
        return this.prisma.document.create({
            data: {
                tenantId,
                ...data,
                versions: {
                    create: [{
                            tenantId,
                            versionNumber: 1,
                            storageKey: data.storageKey,
                            fileSize: data.fileSize,
                            checksum: data.checksum,
                            changeLog: 'Initial upload'
                        }]
                }
            }
        });
    }
    async getDocument(tenantId, id) {
        return this.prisma.document.findUnique({
            where: { id, tenantId },
            include: {
                versions: { orderBy: { versionNumber: 'desc' } },
                tags: true,
                shares: true,
                metadata: true,
                locks: true
            }
        });
    }
    async getDocuments(tenantId, folderId) {
        return this.prisma.document.findMany({
            where: { tenantId, folderId: folderId || null, deletedAt: null },
            include: { tags: true }
        });
    }
    async updateDocument(tenantId, id, dto) {
        return this.prisma.document.update({
            where: { id, tenantId },
            data: dto
        });
    }
    async deleteDocument(tenantId, id) {
        return this.prisma.document.update({
            where: { id, tenantId },
            data: { deletedAt: new Date(), status: 'ARCHIVED' }
        });
    }
    async search(tenantId, query) {
        return this.prisma.document.findMany({
            where: {
                tenantId,
                deletedAt: null,
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                    { ocrText: { contains: query, mode: 'insensitive' } }
                ]
            },
            include: { tags: true }
        });
    }
    async lockDocument(tenantId, documentId, userId) {
        return this.prisma.documentLock.upsert({
            where: { documentId },
            update: { userId, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) },
            create: { tenantId, documentId, userId, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) }
        });
    }
    async unlockDocument(tenantId, documentId) {
        return this.prisma.documentLock.delete({
            where: { documentId }
        });
    }
    async logAudit(tenantId, documentId, userId, action, details) {
        return this.prisma.documentAudit.create({
            data: {
                tenantId,
                documentId,
                userId,
                action,
                details: details || {}
            }
        });
    }
    async shareDocument(tenantId, documentId, permission, sharedWithId, sharedWithEmail) {
        return this.prisma.documentShare.create({
            data: {
                tenantId,
                documentId,
                permission,
                sharedWithId,
                sharedWithEmail
            }
        });
    }
};
exports.DocumentRepository = DocumentRepository;
exports.DocumentRepository = DocumentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DocumentRepository);
//# sourceMappingURL=document.repository.js.map