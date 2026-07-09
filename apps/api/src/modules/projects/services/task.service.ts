import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { TaskRepository } from "../repositories/task.repository";
import { CreateTaskDto, UpdateTaskDto, AssignTaskDto } from "../dto/task.dto";
import { PrismaService } from "../../../common/prisma/prisma.service";

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly prisma: PrismaService
  ) {}

  async create(tenantId: string, userId: string, dto: CreateTaskDto) {
    const project = await this.prisma.project.findUnique({
      where: { id: dto.projectId, tenantId },
    });
    if (!project) throw new NotFoundException("Project not found");

    const existingCode = await this.prisma.task.findUnique({
      where: {
        tenantId_projectId_code: {
          tenantId,
          projectId: dto.projectId,
          code: dto.code,
        },
      },
    });

    if (existingCode) {
      throw new BadRequestException(
        `Task code ${dto.code} already exists in project`
      );
    }

    if (dto.assigneeId) {
      await this.validateAssignee(tenantId, dto.assigneeId);
    }

    const task = await this.taskRepository.create({
      tenant: { connect: { id: tenantId } },
      project: { connect: { id: dto.projectId } },
      code: dto.code,
      title: dto.title,
      description: dto.description,
      status: dto.status,
      priority: dto.priority,
      type: dto.type,
      assignee: dto.assigneeId
        ? { connect: { id: dto.assigneeId } }
        : undefined,
      reporter: { connect: { id: userId } },
      milestone: dto.milestoneId
        ? { connect: { id: dto.milestoneId } }
        : undefined,
      sprint: dto.sprintId ? { connect: { id: dto.sprintId } } : undefined,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      estimatedHours: dto.estimatedHours,
    });

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: "CREATE",
        entityName: "Task",
        entityId: task.id,
        newValues: { code: task.code },
      },
    });

    return task;
  }

  async findAll(tenantId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.taskRepository.findMany(tenantId, {
      skip,
      take: limit,
    });
    return { data, total, page, limit };
  }

  async findOne(tenantId: string, id: string) {
    const task = await this.taskRepository.findById(tenantId, id);
    if (!task) throw new NotFoundException("Task not found");
    return task;
  }

  async update(
    tenantId: string,
    userId: string,
    id: string,
    dto: UpdateTaskDto
  ) {
    const task = await this.findOne(tenantId, id);

    if (dto.status === "DONE" && task.status !== "DONE") {
      const blockingDependencies = await this.prisma.taskDependency.findMany({
        where: {
          taskId: id,
          type: "BLOCKS",
          dependsOn: { status: { not: "DONE" } },
        },
      });
      if (blockingDependencies.length > 0) {
        throw new BadRequestException(
          "Cannot complete task due to uncompleted blocking dependencies"
        );
      }
    }

    const updated = await this.taskRepository.update(tenantId, id, {
      title: dto.title,
      description: dto.description,
      status: dto.status,
      priority: dto.priority,
      type: dto.type,
      milestone: dto.milestoneId
        ? { connect: { id: dto.milestoneId } }
        : undefined,
      sprint: dto.sprintId ? { connect: { id: dto.sprintId } } : undefined,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      estimatedHours: dto.estimatedHours,
      completedAt: dto.status === "DONE" ? new Date() : undefined,
    });

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: "UPDATE",
        entityName: "Task",
        entityId: id,
        newValues: { ...dto },
      },
    });

    return updated;
  }

  async assign(
    tenantId: string,
    userId: string,
    id: string,
    dto: AssignTaskDto
  ) {
    await this.findOne(tenantId, id);
    await this.validateAssignee(tenantId, dto.assigneeId);

    const updated = await this.taskRepository.update(tenantId, id, {
      assignee: { connect: { id: dto.assigneeId } },
    });

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: "UPDATE",
        entityName: "Task",
        entityId: id,
        newValues: { assigneeId: dto.assigneeId },
      },
    });

    return updated;
  }

  async remove(tenantId: string, userId: string, id: string) {
    await this.findOne(tenantId, id);
    const deleted = await this.taskRepository.softDelete(tenantId, id);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: "DELETE",
        entityName: "Task",
        entityId: id,
      },
    });

    return deleted;
  }

  private async validateAssignee(tenantId: string, assigneeId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: assigneeId, tenantId },
      include: { employee: true },
    });

    if (!user) {
      throw new NotFoundException("Assignee not found");
    }

    if (user.status !== "ACTIVE") {
      throw new BadRequestException("Cannot assign inactive users");
    }

    if (user.employee && user.employee.status === "TERMINATED") {
      throw new BadRequestException("Cannot assign terminated employees");
    }
  }
}
