import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { Project, Prisma } from "@prisma/client";

@Injectable()
export class ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.prisma.project.create({ data });
  }

  async findById(tenantId: string, id: string): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: { id, tenantId },
      include: {
        members: true,
      },
    });
  }

  async findMany(
    tenantId: string,
    params: {
      skip?: number;
      take?: number;
      where?: Prisma.ProjectWhereInput;
      orderBy?: Prisma.ProjectOrderByWithRelationInput;
    }
  ): Promise<[Project[], number]> {
    const { skip, take, where, orderBy } = params;

    return Promise.all([
      this.prisma.project.findMany({
        skip,
        take,
        where: { ...where, tenantId },
        orderBy,
      }),
      this.prisma.project.count({
        where: { ...where, tenantId },
      }),
    ]);
  }

  async update(
    tenantId: string,
    id: string,
    data: Prisma.ProjectUpdateInput
  ): Promise<Project> {
    return this.prisma.project.update({
      where: { id, tenantId },
      data,
    });
  }

  async softDelete(tenantId: string, id: string): Promise<Project> {
    return this.prisma.project.update({
      where: { id, tenantId },
      data: { deletedAt: new Date() },
    });
  }
}
