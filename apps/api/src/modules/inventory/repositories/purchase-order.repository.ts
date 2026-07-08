import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreatePurchaseOrderDto, ReceivePurchaseOrderDto } from '../dto/inventory.dto';
import { POStatus, MovementType } from '@prisma/client';
import { BaseException } from '../../../common/exceptions/base.exception';

@Injectable()
export class PurchaseOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPurchaseOrders(tenantId: string) {
    return this.prisma.purchaseOrder.findMany({
      where: { tenantId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: { supplier: true, createdBy: true },
    });
  }

  async findById(tenantId: string, id: string) {
    const po = await this.prisma.purchaseOrder.findUnique({
      where: { id },
      include: { supplier: true, createdBy: true, lines: true },
    });
    if (!po || po.tenantId !== tenantId || po.deletedAt) return null;
    return po;
  }

  async createPO(tenantId: string, actionUserId: string, dto: CreatePurchaseOrderDto) {
    return this.prisma.purchaseOrder.create({
      data: {
        tenantId,
        poNumber: dto.poNumber,
        supplierId: dto.supplierId,
        totalAmount: dto.totalAmount,
        expectedDate: dto.expectedDate ? new Date(dto.expectedDate) : null,
        createdById: actionUserId,
      },
    });
  }

  async updateStatus(tenantId: string, id: string, status: POStatus) {
    return this.prisma.purchaseOrder.update({
      where: { id, tenantId },
      data: { status },
    });
  }

  async receivePO(tenantId: string, id: string, actionUserId: string, dto: ReceivePurchaseOrderDto) {
    const po = await this.findById(tenantId, id);
    if (!po) throw new BaseException('PO not found', 'INV-PO-404', 404);

    return this.prisma.$transaction(async (tx) => {
      // Find line
      const line = await tx.purchaseOrderLine.findFirst({
        where: { poId: id, productId: dto.productId },
      });

      if (!line) throw new BaseException('Product not in PO', 'INV-PO-400', 400);

      await tx.purchaseOrderLine.update({
        where: { id: line.id },
        data: { received: line.received + dto.quantity },
      });

      await tx.purchaseOrder.update({
        where: { id },
        data: { status: POStatus.PARTIALLY_RECEIVED },
      });

      return line;
    });
  }
}
