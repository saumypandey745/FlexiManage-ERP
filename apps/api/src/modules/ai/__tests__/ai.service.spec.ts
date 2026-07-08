import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from '../services/ai.service';
import { AiGatewayService } from '../providers/ai-gateway.service';
import { AiConversationRepository } from '../repositories/ai-conversation.repository';
import { AiPromptRepository } from '../repositories/ai-prompt.repository';
import { AiUsageRepository } from '../repositories/ai-usage.repository';
import { PrismaService } from '../../../common/prisma/prisma.service';

describe('AiService', () => {
  let service: AiService;

  const mockProvider = {
    chat: jest.fn().mockResolvedValue({
      content: 'Hello',
      usage: { promptTokens: 10, completionTokens: 10, totalTokens: 20 },
      model: 'gpt-4o'
    })
  };

  const mockGateway = {
    getProvider: jest.fn().mockReturnValue(mockProvider)
  };

  const mockConvRepo = {
    createConversation: jest.fn().mockResolvedValue({ id: 'conv-1' }),
    getConversation: jest.fn().mockResolvedValue({ id: 'conv-1', messages: [] }),
    addMessage: jest.fn().mockResolvedValue({ id: 'msg-1' }),
  };

  const mockPromptRepo = {
    findByCode: jest.fn().mockResolvedValue({ systemPrompt: 'Sys' }),
  };

  const mockUsageRepo = {
    logUsage: jest.fn().mockResolvedValue(true)
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        { provide: AiGatewayService, useValue: mockGateway },
        { provide: AiConversationRepository, useValue: mockConvRepo },
        { provide: AiPromptRepository, useValue: mockPromptRepo },
        { provide: AiUsageRepository, useValue: mockUsageRepo },
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
  });

  it('should process a chat', async () => {
    const res = await service.chat('tenant-1', 'user-1', { message: 'Hi' });
    expect(res.content).toBe('Hello');
    expect(mockConvRepo.addMessage).toHaveBeenCalledTimes(2);
    expect(mockUsageRepo.logUsage).toHaveBeenCalled();
  });
});
