import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { StockMovementDto } from '../dto/inventory.dto';
import { BaseException } from '../../../common/exceptions/base.exception';
import { MovementType } from '@prisma/client';

@Injectable()
export class StockRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getMovements(tenantId: string) {
    return this.prisma.stockMovement.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      include: { product: true, fromWarehouse: true, toWarehouse: true, performedBy: true },
    });
  }

  async processMovement(tenantId: string, actionUserId: string, dto: StockMovementDto) {
    return this.prisma.$transaction(async (tx) => {
      if (dto.type === MovementType.IN && dto.toWarehouseId) {
        await this.updateStock(tx, tenantId, dto.toWarehouseId, dto.productId, dto.quantity);
      } else if (dto.type === MovementType.OUT && dto.fromWarehouseId) {
        await this.updateStock(tx, tenantId, dto.fromWarehouseId, dto.productId, -dto.quantity);
      } else if (dto.type === MovementType.TRANSFER && dto.fromWarehouseId && dto.toWarehouseId) {
        await this.updateStock(tx, tenantId, dto.fromWarehouseId, dto.productId, -dto.quantity);
        await this.updateStock(tx, tenantId, dto.toWarehouseId, dto.productId, dto.quantity);
      }

      return tx.stockMovement.create({
        data: {
          tenantId,
          type: dto.type,
          productId: dto.productId,
          fromWarehouseId: dto.fromWarehouseId,
          toWarehouseId: dto.toWarehouseId,
          quantity: dto.quantity,
          reference: dto.reference,
          notes: dto.notes,
          performedById: actionUserId,
        },
      });
    });
  }

  private async updateStock(tx: any, tenantId: string, warehouseId: string, productId: string, qtyChange: number) {
    let stockItem = await tx.stockItem.findFirst({
      where: { tenantId, warehouseId, productId, batchNumber: null },
    });

    if (!stockItem) {
      if (qtyChange < 0) {
        throw new BaseException('Insufficient stock', 'INV-STOCK-400', 400);
      }
      stockItem = await tx.stockItem.create({
        data: { tenantId, warehouseId, productId, quantity: qtyChange },
      });
    } else {
      if (stockItem.quantity + qtyChange < 0) {
        throw new BaseException('Insufficient stock', 'INV-STOCK-400', 400);
      }
      stockItem = await tx.stockItem.update({
        where: { id: stockItem.id },
        data: { quantity: stockItem.quantity + qtyChange },
      });
    }
    return stockItem;
  }
}
