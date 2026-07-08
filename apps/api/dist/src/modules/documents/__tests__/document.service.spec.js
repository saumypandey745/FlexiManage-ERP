"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const document_service_1 = require("../services/document.service");
const document_repository_1 = require("../repositories/document.repository");
describe('DocumentService', () => {
    let service;
    const mockRepo = {
        createFolder: jest.fn().mockResolvedValue({ id: 'f-1', name: 'Docs' }),
        createDocument: jest.fn().mockResolvedValue({ id: 'd-1', title: 'test.pdf' }),
        getDocument: jest.fn().mockResolvedValue({ id: 'd-1', title: 'test.pdf', storageKey: 'test.pdf' }),
        logAudit: jest.fn().mockResolvedValue(true),
    };
    const mockStorage = {
        uploadFile: jest.fn().mockResolvedValue('test.pdf'),
        getSignedUrl: jest.fn().mockResolvedValue('https://signed-url.com/test.pdf'),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                document_service_1.DocumentService,
                { provide: document_repository_1.DocumentRepository, useValue: mockRepo },
                { provide: 'StorageProvider', useValue: mockStorage }
            ],
        }).compile();
        service = module.get(document_service_1.DocumentService);
    });
    it('should create a folder', async () => {
        const res = await service.createFolder('tenant-1', { name: 'Docs' });
        expect(res.name).toBe('Docs');
        expect(mockRepo.createFolder).toHaveBeenCalled();
    });
    it('should upload a document', async () => {
        const file = { originalname: 'test.pdf', buffer: Buffer.from('test'), size: 4, mimetype: 'application/pdf' };
        const res = await service.uploadDocument('tenant-1', 'user-1', file);
        expect(res.title).toBe('test.pdf');
        expect(mockStorage.uploadFile).toHaveBeenCalled();
        expect(mockRepo.logAudit).toHaveBeenCalledWith('tenant-1', 'd-1', 'user-1', 'UPLOAD');
    });
    it('should get signed URL', async () => {
        const res = await service.getSignedUrl('tenant-1', 'd-1', 'user-1');
        expect(res.url).toBe('https://signed-url.com/test.pdf');
    });
});
//# sourceMappingURL=document.service.spec.js.map