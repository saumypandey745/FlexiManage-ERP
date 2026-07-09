import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { Notification, Prisma } from "@prisma/client";

@Injectable()
export class NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.NotificationCreateInput): Promise<Notification> {
    return this.prisma.notification.create({ data });
  }

  async findById(tenantId: string, id: string): Promise<Notification | null> {
    return this.prisma.notification.findUnique({
      where: { id, tenantId },
      include: {
        recipients: true,
      },
    });
  }

  async findMany(
    tenantId: string,
    params: {
      skip?: number;
      take?: number;
      where?: Prisma.NotificationWhereInput;
      orderBy?: Prisma.NotificationOrderByWithRelationInput;
    }
  ): Promise<[Notification[], number]> {
    const { skip, take, where, orderBy } = params;

    return Promise.all([
      this.prisma.notification.findMany({
        skip,
        take,
        where: { ...where, tenantId },
        orderBy,
        include: { recipients: true },
      }),
      this.prisma.notification.count({
        where: { ...where, tenantId },
      }),
    ]);
  }

  async update(
    tenantId: string,
    id: string,
    data: Prisma.NotificationUpdateInput
  ): Promise<Notification> {
    return this.prisma.notification.update({
      where: { id, tenantId },
      data,
    });
  }

  async softDelete(tenantId: string, id: string): Promise<Notification> {
    return this.prisma.notification.update({
      where: { id, tenantId },
      data: { deletedAt: new Date() },
    });
  }
}
