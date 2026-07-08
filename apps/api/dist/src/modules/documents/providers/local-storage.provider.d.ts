import { IStorageProvider } from '../interfaces/storage-provider.interface';
export declare class LocalStorageProvider implements IStorageProvider {
    private readonly storagePath;
    private readonly logger;
    constructor();
    uploadFile(key: string, buffer: Buffer, mimeType: string): Promise<string>;
    downloadFile(key: string): Promise<Buffer>;
    deleteFile(key: string): Promise<boolean>;
    getSignedUrl(key: string, expiresIn?: number): Promise<string>;
}
