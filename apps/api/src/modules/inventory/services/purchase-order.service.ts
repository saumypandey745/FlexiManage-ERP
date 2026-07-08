import { Injectable } from '@nestjs/common';
import { PurchaseOrderRepository } from '../repositories/purchase-order.repository';
import { CreatePurchaseOrderDto, ReceivePurchaseOrderDto } from '../dto/inventory.dto';
import { BaseException } from '../../../common/exceptions/base.exception';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { POStatus } from '@prisma/client';

@Injectable()
export class PurchaseOrderService {
  constructor(
    private readonly repository: PurchaseOrderRepository,
    private readonly prisma: PrismaService,
  ) {}

  async findAll(tenantId: string) {
    return this.repository.findPurchaseOrders(tenantId);
  }

  async findOne(tenantId: string, id: string) {
    const po = await this.repository.findById(tenantId, id);
    if (!po) throw new BaseException('PO not found', 'INV-PO-404', 404);
    return po;
  }

  async create(tenantId: string, actionUserId: string, dto: CreatePurchaseOrderDto) {
    const po = await this.repository.createPO(tenantId, actionUserId, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: 'CREATE',
        entityName: 'PurchaseOrder',
        entityId: po.id,
        newValues: { poNumber: dto.poNumber },
      },
    });

    return po;
  }

  async approve(tenantId: string, id: string, actionUserId: string) {
    const po = await this.findOne(tenantId, id);
    const updated = await this.repository.updateStatus(tenantId, id, POStatus.APPROVED);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: 'UPDATE',
        entityName: 'PurchaseOrder',
        entityId: id,
        newValues: { status: POStatus.APPROVED },
      },
    });

    return updated;
  }

  async receive(tenantId: string, id: string, actionUserId: string, dto: ReceivePurchaseOrderDto) {
    const result = await this.repository.receivePO(tenantId, id, actionUserId, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: 'UPDATE',
        entityName: 'PurchaseOrder',
        entityId: id,
        newValues: { receivedQuantity: dto.quantity, productId: dto.productId },
      },
    });

    return result;
  }
}
