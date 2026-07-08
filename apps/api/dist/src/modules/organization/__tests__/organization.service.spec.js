"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const branch_service_1 = require("../services/branch.service");
const department_service_1 = require("../services/department.service");
const organization_repository_1 = require("../organization.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
describe('Organization Services', () => {
    let branchService;
    let departmentService;
    let repo;
    let prisma;
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
            },
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                branch_service_1.BranchService,
                department_service_1.DepartmentService,
                { provide: organization_repository_1.OrganizationRepository, useValue: repo },
                { provide: prisma_service_1.PrismaService, useValue: prisma },
            ],
        }).compile();
        branchService = module.get(branch_service_1.BranchService);
        departmentService = module.get(department_service_1.DepartmentService);
    });
    describe('BranchService', () => {
        it('should create a branch and log audit', async () => {
            const mockBranch = { id: 'branch-1', name: 'HQ' };
            repo.createBranch.mockResolvedValueOnce(mockBranch);
            prisma.auditLog.create.mockResolvedValueOnce({});
            const result = await branchService.createBranch('tenant-1', 'user-1', { code: 'BR-1', name: 'HQ' });
            expect(result).toEqual(mockBranch);
            expect(repo.createBranch).toHaveBeenCalledWith('tenant-1', { code: 'BR-1', name: 'HQ' });
            expect(prisma.auditLog.create).toHaveBeenCalled();
        });
    });
    describe('DepartmentService', () => {
        it('should create a department and log audit', async () => {
            const mockDept = { id: 'dept-1', name: 'Engineering' };
            repo.createDepartment.mockResolvedValueOnce(mockDept);
            prisma.auditLog.create.mockResolvedValueOnce({});
            const result = await departmentService.createDepartment('tenant-1', 'user-1', { code: 'DEP-1', name: 'Engineering' });
            expect(result).toEqual(mockDept);
            expect(repo.createDepartment).toHaveBeenCalledWith('tenant-1', { code: 'DEP-1', name: 'Engineering' });
            expect(prisma.auditLog.create).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=organization.service.spec.js.map