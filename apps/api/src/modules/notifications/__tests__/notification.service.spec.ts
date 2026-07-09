import { Test, TestingModule } from "@nestjs/testing";
import { NotificationService } from "../services/notification.service";
import { NotificationRepository } from "../repositories/notification.repository";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { NotificationType, NotificationChannel } from "../dto/notification.dto";

describe("NotificationService", () => {
  let service: NotificationService;

  const mockRepo = {
    create: jest.fn().mockResolvedValue({ id: "notif-1", title: "Test" }),
    findById: jest.fn().mockResolvedValue({ id: "notif-1", title: "Test" }),
    findMany: jest.fn().mockResolvedValue([[{ id: "notif-1" }], 1]),
    update: jest.fn().mockResolvedValue({ id: "notif-1" }),
    softDelete: jest.fn().mockResolvedValue({ id: "notif-1" }),
  };

  const mockPrisma = {
    notificationRecipient: {
      findFirst: jest.fn().mockResolvedValue({ id: "rec-1" }),
      update: jest.fn().mockResolvedValue({ id: "rec-1", isRead: true }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        { provide: NotificationRepository, useValue: mockRepo },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a notification", async () => {
    const dto = {
      type: NotificationType.SYSTEM,
      title: "Test",
      body: "Body",
      recipientIds: ["user-1"],
      channels: [NotificationChannel.IN_APP],
    };
    const res = await service.create("tenant-1", "sender-1", dto);
    expect(res.id).toBe("notif-1");
    expect(mockRepo.create).toHaveBeenCalled();
  });
});
