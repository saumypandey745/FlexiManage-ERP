import { Injectable } from "@nestjs/common";
import { StockRepository } from "../repositories/stock.repository";
import { StockMovementDto } from "../dto/inventory.dto";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { MovementType } from "@prisma/client";

@Injectable()
export class StockService {
  constructor(
    private readonly repository: StockRepository,
    private readonly prisma: PrismaService
  ) {}

  async getMovements(tenantId: string) {
    return this.repository.getMovements(tenantId);
  }

  async processMovement(
    tenantId: string,
    actionUserId: string,
    dto: StockMovementDto
  ) {
    const movement = await this.repository.processMovement(
      tenantId,
      actionUserId,
      dto
    );

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: "CREATE",
        entityName: "StockMovement",
        entityId: movement.id,
        newValues: {
          type: dto.type,
          quantity: dto.quantity,
          productId: dto.productId,
        },
      },
    });

    return movement;
  }
}
