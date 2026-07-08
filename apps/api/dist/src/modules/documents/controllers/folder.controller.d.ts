import { DocumentService } from '../services/document.service';
import { CreateFolderDto, UpdateFolderDto } from '../dto/documents.dto';
export declare class FolderController {
    private readonly docService;
    constructor(docService: DocumentService);
    createFolder(req: any, dto: CreateFolderDto): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        parentId: string | null;
    }>;
    getFolders(req: any, parentId?: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        parentId: string | null;
    }[]>;
    updateFolder(req: any, id: string, dto: UpdateFolderDto): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        parentId: string | null;
    }>;
    deleteFolder(req: any, id: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        parentId: string | null;
    }>;
}
