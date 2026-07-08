import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from '../services/chat.service';
import { ChatRepository } from '../repositories/chat.repository';
import { PrismaService } from '../../../common/prisma/prisma.service';

describe('ChatService', () => {
  let service: ChatService;

  const mockRepo = {
    createRoom: jest.fn().mockResolvedValue({ id: 'room-1', name: 'General' }),
    findRoomById: jest.fn().mockResolvedValue({ id: 'room-1', participants: [{ userId: 'user-1' }] }),
    findRooms: jest.fn().mockResolvedValue([[{ id: 'room-1' }], 1]),
    createMessage: jest.fn().mockResolvedValue({ id: 'msg-1', content: 'Hello' }),
    findMessagesByRoom: jest.fn().mockResolvedValue([[{ id: 'msg-1' }], 1]),
  };

  const mockPrisma = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        { provide: ChatRepository, useValue: mockRepo },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send a message', async () => {
    const dto = { roomId: 'room-1', content: 'Hello' };
    const res = await service.sendMessage('tenant-1', 'user-1', dto);
    expect(res.id).toBe('msg-1');
    expect(mockRepo.createMessage).toHaveBeenCalled();
  });
});
