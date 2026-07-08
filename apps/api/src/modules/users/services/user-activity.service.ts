import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class UserActivityService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserActivity(tenantId: string, userId: string, limit: number = 50) {
    return this.prisma.auditLog.findMany({
      where: { tenantId, userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}
