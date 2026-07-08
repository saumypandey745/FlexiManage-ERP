import { DocumentService } from '../services/document.service';
import { UploadDocumentDto, UpdateDocumentDto, ShareDocumentDto, SearchDocumentDto } from '../dto/documents.dto';
export declare class DocumentController {
    private readonly docService;
    constructor(docService: DocumentService);
    upload(req: any, file: any, dto: UploadDocumentDto): Promise<{
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
    findAll(req: any, folderId?: string): Promise<({
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
    search(req: any, dto: SearchDocumentDto): Promise<({
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
    findOne(req: any, id: string): Promise<{
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
    update(req: any, id: string, dto: UpdateDocumentDto): Promise<{
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
    remove(req: any, id: string): Promise<{
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
    share(req: any, id: string, dto: ShareDocumentDto): Promise<{
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
    checkOut(req: any, id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    checkIn(req: any, id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    download(req: any, id: string): Promise<{
        url: string;
    }>;
}
