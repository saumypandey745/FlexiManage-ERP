import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from "@nestjs/common";
import { DocumentRepository } from "../repositories/document.repository";
import { IStorageProvider } from "../interfaces/storage-provider.interface";
import {
  CreateFolderDto,
  UpdateFolderDto,
  UpdateDocumentDto,
  ShareDocumentDto,
} from "../dto/documents.dto";
import * as crypto from "crypto";
import { extname } from "path";

@Injectable()
export class DocumentService {
  constructor(
    private readonly repo: DocumentRepository,
    @Inject("StorageProvider") private readonly storage: IStorageProvider
  ) {}

  // ===================== FOLDER =====================
  async createFolder(tenantId: string, dto: CreateFolderDto) {
    return this.repo.createFolder(tenantId, dto);
  }

  async getFolders(tenantId: string, parentId?: string) {
    return this.repo.getFolders(tenantId, parentId);
  }

  async updateFolder(tenantId: string, id: string, dto: UpdateFolderDto) {
    return this.repo.updateFolder(tenantId, id, dto);
  }

  async deleteFolder(tenantId: string, id: string) {
    return this.repo.deleteFolder(tenantId, id);
  }

  // ===================== DOCUMENT =====================
  async uploadDocument(
    tenantId: string,
    userId: string,
    file: any,
    folderId?: string,
    description?: string
  ) {
    if (!file) throw new BadRequestException("File is required");

    const extension = extname(file.originalname).replace(".", "");
    const key = `${tenantId}/${new Date().getTime()}-${crypto
      .randomBytes(4)
      .toString("hex")}.${extension}`;

    await this.storage.uploadFile(key, file.buffer, file.mimetype);

    const checksum = crypto
      .createHash("sha256")
      .update(file.buffer)
      .digest("hex");

    const documentData = {
      folderId,
      title: file.originalname,
      description,
      fileSize: file.size,
      mimeType: file.mimetype,
      extension,
      checksum,
      storageKey: key,
      storageProvider: "LOCAL",
    };

    const doc = await this.repo.createDocument(tenantId, documentData);
    await this.repo.logAudit(tenantId, doc.id, userId, "UPLOAD");

    return doc;
  }

  async getDocument(tenantId: string, id: string) {
    const doc = await this.repo.getDocument(tenantId, id);
    if (!doc) throw new NotFoundException("Document not found");
    return doc;
  }

  async getDocuments(tenantId: string, folderId?: string) {
    return this.repo.getDocuments(tenantId, folderId);
  }

  async updateDocument(tenantId: string, id: string, dto: UpdateDocumentDto) {
    return this.repo.updateDocument(tenantId, id, dto);
  }

  async deleteDocument(tenantId: string, id: string, userId: string) {
    const doc = await this.repo.deleteDocument(tenantId, id);
    await this.repo.logAudit(tenantId, id, userId, "DELETE");
    return doc;
  }

  async searchDocuments(tenantId: string, query: string) {
    return this.repo.search(tenantId, query);
  }

  async getSignedUrl(tenantId: string, id: string, userId: string) {
    const doc = await this.getDocument(tenantId, id);
    const url = await this.storage.getSignedUrl(doc.storageKey);
    await this.repo.logAudit(tenantId, id, userId, "DOWNLOAD");
    return { url };
  }

  // ===================== ACTIONS =====================
  async checkOutDocument(tenantId: string, id: string, userId: string) {
    const doc = await this.getDocument(tenantId, id);
    if (doc.locks && doc.locks.length > 0) {
      throw new BadRequestException(
        "Document is already locked by another user"
      );
    }

    await this.repo.lockDocument(tenantId, id, userId);
    await this.repo.logAudit(tenantId, id, userId, "CHECKOUT");
    return { success: true, message: "Document locked for editing" };
  }

  async checkInDocument(tenantId: string, id: string, userId: string) {
    await this.repo.unlockDocument(tenantId, id);
    await this.repo.logAudit(tenantId, id, userId, "CHECKIN");
    return { success: true, message: "Document unlocked" };
  }

  async shareDocument(
    tenantId: string,
    id: string,
    userId: string,
    dto: ShareDocumentDto
  ) {
    const share = await this.repo.shareDocument(
      tenantId,
      id,
      dto.permission,
      dto.sharedWithId,
      dto.sharedWithEmail
    );
    await this.repo.logAudit(tenantId, id, userId, "SHARE", {
      shareId: share.id,
    });
    return share;
  }
}
