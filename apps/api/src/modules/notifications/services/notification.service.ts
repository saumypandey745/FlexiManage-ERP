import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification.repository';
import { CreateNotificationDto } from '../dto/notification.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(tenantId: string, senderId: string, dto: CreateNotificationDto) {
    const notification = await this.notificationRepository.create({
      tenant: { connect: { id: tenantId } },
      type: dto.type,
      title: dto.title,
      body: dto.body,
      data: dto.data ? (dto.data as any) : undefined,
      sender: { connect: { id: senderId } },
      recipients: {
        create: dto.recipientIds.flatMap(userId => 
          dto.channels.map(channel => ({
            user: { connect: { id: userId } },
            channel,
            status: 'PENDING'
          }))
        )
      }
    });

    // TODO: Publish event to trigger Queue workers (BullMQ) based on channel

    return notification;
  }

  async findAll(tenantId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.notificationRepository.findMany(tenantId, { skip, take: limit });
    return { data, total, page, limit };
  }

  async markAsRead(tenantId: string, userId: string, notificationId: string) {
    const recipient = await this.prisma.notificationRecipient.findFirst({
      where: {
        notificationId,
        userId,
        notification: { tenantId }
      }
    });

    if (!recipient) throw new NotFoundException('Notification recipient not found');

    return this.prisma.notificationRecipient.update({
      where: { id: recipient.id },
      data: { isRead: true, readAt: new Date() }
    });
  }
}
