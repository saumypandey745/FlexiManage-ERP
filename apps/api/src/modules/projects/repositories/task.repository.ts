import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { Task, Prisma } from '@prisma/client';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  async findById(tenantId: string, id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id, tenantId },
    });
  }

  async findMany(tenantId: string, params: {
    skip?: number;
    take?: number;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput;
  }): Promise<[Task[], number]> {
    const { skip, take, where, orderBy } = params;
    
    return Promise.all([
      this.prisma.task.findMany({
        skip,
        take,
        where: { ...where, tenantId },
        orderBy,
      }),
      this.prisma.task.count({
        where: { ...where, tenantId },
      })
    ]);
  }

  async update(tenantId: string, id: string, data: Prisma.TaskUpdateInput): Promise<Task> {
    return this.prisma.task.update({
      where: { id, tenantId },
      data,
    });
  }

  async softDelete(tenantId: string, id: string): Promise<Task> {
    return this.prisma.task.update({
      where: { id, tenantId },
      data: { deletedAt: new Date() },
    });
  }
}
