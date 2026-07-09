import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/prisma/prisma.service";
import {
  CreateFolderDto,
  UpdateFolderDto,
  UpdateDocumentDto,
  DocumentPermissionType,
} from "../dto/documents.dto";

@Injectable()
export class DocumentRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ===================== FOLDER =====================
  async createFolder(tenantId: string, dto: CreateFolderDto) {
    return this.prisma.folder.create({
      data: {
        tenantId,
        name: dto.name,
        parentId: dto.parentId,
      },
    });
  }

  async getFolders(tenantId: string, parentId?: string) {
    return this.prisma.folder.findMany({
      where: { tenantId, parentId: parentId || null, deletedAt: null },
    });
  }

  async updateFolder(tenantId: string, id: string, dto: UpdateFolderDto) {
    return this.prisma.folder.update({
      where: { id, tenantId },
      data: dto,
    });
  }

  async deleteFolder(tenantId: string, id: string) {
    return this.prisma.folder.update({
      where: { id, tenantId },
      data: { deletedAt: new Date() },
    });
  }

  // ===================== DOCUMENT =====================
  async createDocument(tenantId: string, data: any) {
    return this.prisma.document.create({
      data: {
        tenantId,
        ...data,
        versions: {
          create: [
            {
              tenantId,
              versionNumber: 1,
              storageKey: data.storageKey,
              fileSize: data.fileSize,
              checksum: data.checksum,
              changeLog: "Initial upload",
            },
          ],
        },
      },
    });
  }

  async getDocument(tenantId: string, id: string) {
    return this.prisma.document.findUnique({
      where: { id, tenantId },
      include: {
        versions: { orderBy: { versionNumber: "desc" } },
        tags: true,
        shares: true,
        metadata: true,
        locks: true,
      },
    });
  }

  async getDocuments(tenantId: string, folderId?: string) {
    return this.prisma.document.findMany({
      where: { tenantId, folderId: folderId || null, deletedAt: null },
      include: { tags: true },
    });
  }

  async updateDocument(tenantId: string, id: string, dto: UpdateDocumentDto) {
    return this.prisma.document.update({
      where: { id, tenantId },
      data: dto,
    });
  }

  async deleteDocument(tenantId: string, id: string) {
    return this.prisma.document.update({
      where: { id, tenantId },
      data: { deletedAt: new Date(), status: "ARCHIVED" },
    });
  }

  async search(tenantId: string, query: string) {
    return this.prisma.document.findMany({
      where: {
        tenantId,
        deletedAt: null,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { ocrText: { contains: query, mode: "insensitive" } },
        ],
      },
      include: { tags: true },
    });
  }

  // ===================== LOCKING & AUDIT =====================
  async lockDocument(tenantId: string, documentId: string, userId: string) {
    return this.prisma.documentLock.upsert({
      where: { documentId },
      update: { userId, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) }, // 24 hours lock
      create: {
        tenantId,
        documentId,
        userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });
  }

  async unlockDocument(tenantId: string, documentId: string) {
    return this.prisma.documentLock.delete({
      where: { documentId },
    });
  }

  async logAudit(
    tenantId: string,
    documentId: string,
    userId: string,
    action: string,
    details?: any
  ) {
    return this.prisma.documentAudit.create({
      data: {
        tenantId,
        documentId,
        userId,
        action,
        details: details || {},
      },
    });
  }

  // ===================== SHARING =====================
  async shareDocument(
    tenantId: string,
    documentId: string,
    permission: DocumentPermissionType,
    sharedWithId?: string,
    sharedWithEmail?: string
  ) {
    return this.prisma.documentShare.create({
      data: {
        tenantId,
        documentId,
        permission,
        sharedWithId,
        sharedWithEmail,
      },
    });
  }
}
