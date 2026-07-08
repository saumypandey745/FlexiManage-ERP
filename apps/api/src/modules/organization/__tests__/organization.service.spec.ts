import { Test, TestingModule } from '@nestjs/testing';
import { BranchService } from '../services/branch.service';
import { DepartmentService } from '../services/department.service';
import { OrganizationRepository } from '../organization.repository';
import { PrismaService } from '../../../common/prisma/prisma.service';

describe('Organization Services', () => {
  let branchService: BranchService;
  let departmentService: DepartmentService;
  let repo: jest.Mocked<Partial<OrganizationRepository>>;
  let prisma: jest.Mocked<Partial<PrismaService>>;

  beforeEach(async () => {
    repo = {
      findBranches: jest.fn(),
      createBranch: jest.fn(),
      findDepartments: jest.fn(),
      createDepartment: jest.fn(),
    };

    prisma = {
      auditLog: {
        create: jest.fn(),
      } as any,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BranchService,
        DepartmentService,
        { provide: OrganizationRepository, useValue: repo },
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    branchService = module.get<BranchService>(BranchService);
    departmentService = module.get<DepartmentService>(DepartmentService);
  });

  describe('BranchService', () => {
    it('should create a branch and log audit', async () => {
      const mockBranch = { id: 'branch-1', name: 'HQ' };
      (repo.createBranch as jest.Mock).mockResolvedValueOnce(mockBranch);
      (prisma.auditLog!.create as jest.Mock).mockResolvedValueOnce({});

      const result = await branchService.createBranch('tenant-1', 'user-1', { code: 'BR-1', name: 'HQ' });

      expect(result).toEqual(mockBranch);
      expect(repo.createBranch).toHaveBeenCalledWith('tenant-1', { code: 'BR-1', name: 'HQ' });
      expect(prisma.auditLog!.create).toHaveBeenCalled();
    });
  });

  describe('DepartmentService', () => {
    it('should create a department and log audit', async () => {
      const mockDept = { id: 'dept-1', name: 'Engineering' };
      (repo.createDepartment as jest.Mock).mockResolvedValueOnce(mockDept);
      (prisma.auditLog!.create as jest.Mock).mockResolvedValueOnce({});

      const result = await departmentService.createDepartment('tenant-1', 'user-1', { code: 'DEP-1', name: 'Engineering' });

      expect(result).toEqual(mockDept);
      expect(repo.createDepartment).toHaveBeenCalledWith('tenant-1', { code: 'DEP-1', name: 'Engineering' });
      expect(prisma.auditLog!.create).toHaveBeenCalled();
    });
  });
});
