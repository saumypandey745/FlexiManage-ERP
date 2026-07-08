import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { CreateProjectDto, UpdateProjectDto } from '../dto/project.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(tenantId: string, userId: string, dto: CreateProjectDto) {
    const existing = await this.prisma.project.findUnique({
      where: {
        tenantId_code: {
          tenantId,
          code: dto.code,
        },
      },
    });
    
    if (existing) {
      throw new BadRequestException(`Project code ${dto.code} already exists`);
    }

    const project = await this.projectRepository.create({
      tenant: { connect: { id: tenantId } },
      name: dto.name,
      code: dto.code,
      description: dto.description,
      status: dto.status,
      priority: dto.priority,
      startDate: dto.startDate ? new Date(dto.startDate) : undefined,
      endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      budget: dto.budget,
      customer: dto.customerId ? { connect: { id: dto.customerId } } : undefined,
      members: dto.memberIds ? {
        create: dto.memberIds.map(memberId => ({
          tenant: { connect: { id: tenantId } },
          user: { connect: { id: memberId } },
          role: 'MEMBER'
        }))
      } : undefined
    });

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: 'CREATE',
        entityName: 'Project',
        entityId: project.id,
        newValues: { code: project.code },
      },
    });

    return project;
  }

  async findAll(tenantId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.projectRepository.findMany(tenantId, { skip, take: limit });
    return { data, total, page, limit };
  }

  async findOne(tenantId: string, id: string) {
    const project = await this.projectRepository.findById(tenantId, id);
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async update(tenantId: string, userId: string, id: string, dto: UpdateProjectDto) {
    const project = await this.findOne(tenantId, id);
    
    const updated = await this.projectRepository.update(tenantId, id, {
      name: dto.name,
      description: dto.description,
      status: dto.status,
      priority: dto.priority,
      startDate: dto.startDate ? new Date(dto.startDate) : undefined,
      endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      budget: dto.budget,
    });

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: 'UPDATE',
        entityName: 'Project',
        entityId: id,
        newValues: { ...dto },
      },
    });

    return updated;
  }

  async remove(tenantId: string, userId: string, id: string) {
    const project = await this.findOne(tenantId, id);
    
    // Cannot delete if there are incomplete tasks
    const incompleteTasks = await this.prisma.task.count({
      where: {
        tenantId,
        projectId: id,
        status: { notIn: ['DONE'] },
        deletedAt: null
      }
    });

    if (incompleteTasks > 0) {
      throw new BadRequestException('Cannot delete project with active tasks');
    }

    const deleted = await this.projectRepository.softDelete(tenantId, id);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: 'DELETE',
        entityName: 'Project',
        entityId: id,
      },
    });

    return deleted;
  }
}
