export declare enum DocumentStatus {
    ACTIVE = "ACTIVE",
    QUARANTINED = "QUARANTINED",
    ARCHIVED = "ARCHIVED"
}
export declare enum DocumentPermissionType {
    READ = "READ",
    WRITE = "WRITE",
    ADMIN = "ADMIN"
}
export declare class CreateFolderDto {
    name: string;
    parentId?: string;
}
export declare class UpdateFolderDto {
    name?: string;
    parentId?: string;
}
export declare class UploadDocumentDto {
    folderId?: string;
    description?: string;
    tags?: string[];
}
export declare class UpdateDocumentDto {
    title?: string;
    description?: string;
    folderId?: string;
}
export declare class ShareDocumentDto {
    sharedWithId?: string;
    sharedWithEmail?: string;
    permission: DocumentPermissionType;
    expiresAt?: string;
}
export declare class SearchDocumentDto {
    q?: string;
    folderId?: string;
    tags?: string[];
}
