import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import { UserRepository } from '../user.repository';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { UserStatus } from '@prisma/client';

describe('UserService', () => {
  let service: UserService;
  let repo: jest.Mocked<Partial<UserRepository>>;
  let prisma: jest.Mocked<Partial<PrismaService>>;

  beforeEach(async () => {
    repo = {
      createUser: jest.fn(),
      updateStatus: jest.fn(),
    };

    prisma = {
      auditLog: { create: jest.fn() } as any,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: repo },
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should create a user and log audit', async () => {
    const mockUser = { id: 'user-1', email: 'test@test.com', status: UserStatus.INVITED };
    (repo.createUser as jest.Mock).mockResolvedValueOnce(mockUser);
    (prisma.auditLog!.create as jest.Mock).mockResolvedValueOnce({});

    const result = await service.createUser('tenant-1', 'admin', { email: 'test@test.com', password: 'pw' });

    expect(result).toEqual(mockUser);
    expect(repo.createUser).toHaveBeenCalled();
    expect(prisma.auditLog!.create).toHaveBeenCalled();
  });

  it('should update user status and log audit', async () => {
    const mockUser = { id: 'user-1', status: UserStatus.ACTIVE };
    (repo.updateStatus as jest.Mock).mockResolvedValueOnce(mockUser);
    (prisma.auditLog!.create as jest.Mock).mockResolvedValueOnce({});

    const result = await service.changeStatus('tenant-1', 'user-1', 'admin', UserStatus.ACTIVE);

    expect(result).toEqual(mockUser);
    expect(repo.updateStatus).toHaveBeenCalledWith('tenant-1', 'user-1', UserStatus.ACTIVE);
    expect(prisma.auditLog!.create).toHaveBeenCalled();
  });
});
