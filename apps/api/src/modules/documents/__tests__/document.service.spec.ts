import { Test, TestingModule } from "@nestjs/testing";
import { DocumentService } from "../services/document.service";
import { DocumentRepository } from "../repositories/document.repository";

describe("DocumentService", () => {
  let service: DocumentService;

  const mockRepo = {
    createFolder: jest.fn().mockResolvedValue({ id: "f-1", name: "Docs" }),
    createDocument: jest
      .fn()
      .mockResolvedValue({ id: "d-1", title: "test.pdf" }),
    getDocument: jest.fn().mockResolvedValue({
      id: "d-1",
      title: "test.pdf",
      storageKey: "test.pdf",
    }),
    logAudit: jest.fn().mockResolvedValue(true),
  };

  const mockStorage = {
    uploadFile: jest.fn().mockResolvedValue("test.pdf"),
    getSignedUrl: jest
      .fn()
      .mockResolvedValue("https://signed-url.com/test.pdf"),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentService,
        { provide: DocumentRepository, useValue: mockRepo },
        { provide: "StorageProvider", useValue: mockStorage },
      ],
    }).compile();

    service = module.get<DocumentService>(DocumentService);
  });

  it("should create a folder", async () => {
    const res = await service.createFolder("tenant-1", { name: "Docs" });
    expect(res.name).toBe("Docs");
    expect(mockRepo.createFolder).toHaveBeenCalled();
  });

  it("should upload a document", async () => {
    const file = {
      originalname: "test.pdf",
      buffer: Buffer.from("test"),
      size: 4,
      mimetype: "application/pdf",
    } as any;
    const res = await service.uploadDocument("tenant-1", "user-1", file);
    expect(res.title).toBe("test.pdf");
    expect(mockStorage.uploadFile).toHaveBeenCalled();
    expect(mockRepo.logAudit).toHaveBeenCalledWith(
      "tenant-1",
      "d-1",
      "user-1",
      "UPLOAD"
    );
  });

  it("should get signed URL", async () => {
    const res = await service.getSignedUrl("tenant-1", "d-1", "user-1");
    expect(res.url).toBe("https://signed-url.com/test.pdf");
  });
});
