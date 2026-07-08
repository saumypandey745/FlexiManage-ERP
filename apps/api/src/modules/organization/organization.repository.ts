import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateBranchDto, UpdateBranchDto } from './dto/branch.dto';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto/department.dto';
import { CreateTeamDto, UpdateTeamDto } from './dto/team.dto';
import { BusinessProfileDto, OrganizationSettingsDto } from './dto/settings.dto';
import { BaseException } from '../../common/exceptions/base.exception';

@Injectable()
export class OrganizationRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ----------------------------------------------------
  // TENANT & SETTINGS
  // ----------------------------------------------------
  async getTenantInfo(tenantId: string) {
    return this.prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { profile: true },
    });
  }

  async updateTenantSettings(tenantId: string, dto: OrganizationSettingsDto) {
    return this.prisma.tenant.update({
      where: { id: tenantId },
      data: dto,
    });
  }

  async upsertBusinessProfile(tenantId: string, dto: BusinessProfileDto) {
    return this.prisma.organizationProfile.upsert({
      where: { tenantId },
      create: { ...dto, tenantId },
      update: dto,
    });
  }

  // ----------------------------------------------------
  // BRANCHES
  // ----------------------------------------------------
  async findBranches(tenantId: string) {
    return this.prisma.branch.findMany({ where: { tenantId, deletedAt: null } });
  }

  async createBranch(tenantId: string, dto: CreateBranchDto) {
    const exists = await this.prisma.branch.findUnique({
      where: { tenantId_code: { tenantId, code: dto.code } },
    });
    if (exists && !exists.deletedAt) {
      throw new BaseException('Branch code already exists', 'ORG-409', 409);
    }
    return this.prisma.branch.create({
      data: { ...dto, tenantId },
    });
  }

  async updateBranch(tenantId: string, branchId: string, dto: UpdateBranchDto) {
    return this.prisma.branch.update({
      where: { id: branchId, tenantId },
      data: dto,
    });
  }

  async deleteBranch(tenantId: string, branchId: string) {
    return this.prisma.branch.update({
      where: { id: branchId, tenantId },
      data: { deletedAt: new Date() },
    });
  }

  // ----------------------------------------------------
  // DEPARTMENTS
  // ----------------------------------------------------
  async findDepartments(tenantId: string) {
    return this.prisma.department.findMany({ where: { tenantId, deletedAt: null } });
  }

  async createDepartment(tenantId: string, dto: CreateDepartmentDto) {
    const exists = await this.prisma.department.findUnique({
      where: { tenantId_code: { tenantId, code: dto.code } },
    });
    if (exists && !exists.deletedAt) {
      throw new BaseException('Department code already exists', 'ORG-409', 409);
    }
    return this.prisma.department.create({
      data: { ...dto, tenantId },
    });
  }

  async updateDepartment(tenantId: string, departmentId: string, dto: UpdateDepartmentDto) {
    return this.prisma.department.update({
      where: { id: departmentId, tenantId },
      data: dto,
    });
  }

  async deleteDepartment(tenantId: string, departmentId: string) {
    return this.prisma.department.update({
      where: { id: departmentId, tenantId },
      data: { deletedAt: new Date() },
    });
  }

  // ----------------------------------------------------
  // TEAMS
  // ----------------------------------------------------
  async findTeams(tenantId: string) {
    return this.prisma.team.findMany({ where: { tenantId, deletedAt: null } });
  }

  async createTeam(tenantId: string, dto: CreateTeamDto) {
    const exists = await this.prisma.team.findUnique({
      where: { tenantId_code: { tenantId, code: dto.code } },
    });
    if (exists && !exists.deletedAt) {
      throw new BaseException('Team code already exists', 'ORG-409', 409);
    }
    return this.prisma.team.create({
      data: { ...dto, tenantId },
    });
  }

  async updateTeam(tenantId: string, teamId: string, dto: UpdateTeamDto) {
    return this.prisma.team.update({
      where: { id: teamId, tenantId },
      data: dto,
    });
  }

  async deleteTeam(tenantId: string, teamId: string) {
    return this.prisma.team.update({
      where: { id: teamId, tenantId },
      data: { deletedAt: new Date() },
    });
  }
}
