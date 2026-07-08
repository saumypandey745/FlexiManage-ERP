import { DocumentRepository } from '../repositories/document.repository';
import { IStorageProvider } from '../interfaces/storage-provider.interface';
import { CreateFolderDto, UpdateFolderDto, UpdateDocumentDto, ShareDocumentDto } from '../dto/documents.dto';
export declare class DocumentService {
    private readonly repo;
    private readonly storage;
    constructor(repo: DocumentRepository, storage: IStorageProvider);
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
    uploadDocument(tenantId: string, userId: string, file: any, folderId?: string, description?: string): Promise<{
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
    getDocument(tenantId: string, id: string): Promise<{
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
    }>;
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
    deleteDocument(tenantId: string, id: string, userId: string): Promise<{
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
    searchDocuments(tenantId: string, query: string): Promise<({
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
    getSignedUrl(tenantId: string, id: string, userId: string): Promise<{
        url: string;
    }>;
    checkOutDocument(tenantId: string, id: string, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    checkInDocument(tenantId: string, id: string, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    shareDocument(tenantId: string, id: string, userId: string, dto: ShareDocumentDto): Promise<{
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
