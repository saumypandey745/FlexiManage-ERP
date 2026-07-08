import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationService } from '../services/integration.service';
import { IntegrationRepository } from '../repositories/integration.repository';
import { EncryptionService } from '../services/encryption.service';

describe('IntegrationService', () => {
  let service: IntegrationService;

  const mockRepo = {
    connect: jest.fn().mockResolvedValue({ id: 'int-1', provider: 'STRIPE' }),
    getIntegration: jest.fn().mockResolvedValue({ id: 'int-1', provider: 'STRIPE', credentials: [] }),
    logAudit: jest.fn().mockResolvedValue(true),
  };

  const mockEncryption = {
    encrypt: jest.fn().mockReturnValue({ encryptedValue: 'enc', iv: 'iv' }),
    decrypt: jest.fn().mockReturnValue('decrypted'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntegrationService,
        { provide: IntegrationRepository, useValue: mockRepo },
        { provide: EncryptionService, useValue: mockEncryption }
      ],
    }).compile();

    service = module.get<IntegrationService>(IntegrationService);
  });

  it('should connect an integration', async () => {
    const res = await service.connect('tenant-1', 'user-1', {
      provider: 'STRIPE',
      category: 'PAYMENT',
      name: 'My Stripe'
    });
    expect(res.provider).toBe('STRIPE');
    expect(mockRepo.logAudit).toHaveBeenCalledWith('int-1', 'user-1', 'CONNECT');
  });

  it('should get decrypted credentials', async () => {
    mockRepo.getIntegration.mockResolvedValueOnce({
      id: 'int-1',
      credentials: [{ keyName: 'API_KEY', encryptedValue: 'enc', iv: 'iv' }]
    });
    
    const res = await service.getDecryptedCredentials('tenant-1', 'int-1');
    expect(res['API_KEY']).toBe('decrypted');
  });
});
