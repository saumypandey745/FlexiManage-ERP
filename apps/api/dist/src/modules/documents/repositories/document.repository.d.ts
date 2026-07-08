import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateFolderDto, UpdateFolderDto, UpdateDocumentDto, DocumentPermissionType } from '../dto/documents.dto';
export declare class DocumentRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createFolder(tenantId: string, dto: CreateFolderDto): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        parentId: string | null;
    }>;
    getFolders(tenantId: string, parentId?: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        parentId: string | null;
    }[]>;
    updateFolder(tenantId: string, id: string, dto: UpdateFolderDto): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        parentId: string | null;
    }>;
    deleteFolder(tenantId: string, id: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        parentId: string | null;
    }>;
    createDocument(tenantId: string, data: any): Promise<{
        status: string;
        description: string | null;
        title: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        folderId: string | null;
        fileSize: bigint;
        mimeType: string;
        extension: string;
        checksum: string | null;
        storageKey: string;
        storageProvider: string;
        isLocked: boolean;
        ocrText: string | null;
    }>;
    getDocument(tenantId: string, id: string): Promise<({
        tags: {
            id: string;
            tenantId: string;
            createdAt: Date;
            documentId: string;
            tag: string;
        }[];
        shares: {
            permission: string;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            sharedWithId: string | null;
            sharedWithEmail: string | null;
            expiresAt: Date | null;
            documentId: string;
        }[];
        metadata: {
            value: string;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            key: string;
            documentId: string;
        }[];
        versions: {
            id: string;
            tenantId: string;
            createdAt: Date;
            fileSize: bigint;
            checksum: string | null;
            storageKey: string;
            versionNumber: number;
            changeLog: string | null;
            documentId: string;
        }[];
        locks: {
            id: string;
            tenantId: string;
            createdAt: Date;
            userId: string;
            expiresAt: Date | null;
            documentId: string;
        }[];
    } & {
        status: string;
        description: string | null;
        title: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        folderId: string | null;
        fileSize: bigint;
        mimeType: string;
        extension: string;
        checksum: string | null;
        storageKey: string;
        storageProvider: string;
        isLocked: boolean;
        ocrText: string | null;
    }) | null>;
    getDocuments(tenantId: string, folderId?: string): Promise<({
        tags: {
            id: string;
            tenantId: string;
            createdAt: Date;
            documentId: string;
            tag: string;
        }[];
    } & {
        status: string;
        description: string | null;
        title: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        folderId: string | null;
        fileSize: bigint;
        mimeType: string;
        extension: string;
        checksum: string | null;
        storageKey: string;
        storageProvider: string;
        isLocked: boolean;
        ocrText: string | null;
    })[]>;
    updateDocument(tenantId: string, id: string, dto: UpdateDocumentDto): Promise<{
        status: string;
        description: string | null;
        title: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        folderId: string | null;
        fileSize: bigint;
        mimeType: string;
        extension: string;
        checksum: string | null;
        storageKey: string;
        storageProvider: string;
        isLocked: boolean;
        ocrText: string | null;
    }>;
    deleteDocument(tenantId: string, id: string): Promise<{
        status: string;
        description: string | null;
        title: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        folderId: string | null;
        fileSize: bigint;
        mimeType: string;
        extension: string;
        checksum: string | null;
        storageKey: string;
        storageProvider: string;
        isLocked: boolean;
        ocrText: string | null;
    }>;
    search(tenantId: string, query: string): Promise<({
        tags: {
            id: string;
            tenantId: string;
            createdAt: Date;
            documentId: string;
            tag: string;
        }[];
    } & {
        status: string;
        description: string | null;
        title: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        folderId: string | null;
        fileSize: bigint;
        mimeType: string;
        extension: string;
        checksum: string | null;
        storageKey: string;
        storageProvider: string;
        isLocked: boolean;
        ocrText: string | null;
    })[]>;
    lockDocument(tenantId: string, documentId: string, userId: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        userId: string;
        expiresAt: Date | null;
        documentId: string;
    }>;
    unlockDocument(tenantId: string, documentId: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        userId: string;
        expiresAt: Date | null;
        documentId: string;
    }>;
    logAudit(tenantId: string, documentId: string, userId: string, action: string, details?: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        userId: string | null;
        action: string;
        details: import("@prisma/client/runtime/library").JsonValue | null;
        documentId: string;
        ipAddress: string | null;
        userAgent: string | null;
    }>;
    shareDocument(tenantId: string, documentId: string, permission: DocumentPermissionType, sharedWithId?: string, sharedWithEmail?: string): Promise<{
        permission: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        sharedWithId: string | null;
        sharedWithEmail: string | null;
        expiresAt: Date | null;
        documentId: string;
    }>;
}
