import { Injectable } from '@nestjs/common';
import { WarehouseRepository } from '../repositories/warehouse.repository';
import { CreateWarehouseDto, UpdateWarehouseDto } from '../dto/inventory.dto';
import { BaseException } from '../../../common/exceptions/base.exception';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class WarehouseService {
  constructor(
    private readonly repository: WarehouseRepository,
    private readonly prisma: PrismaService,
  ) {}

  async findAll(tenantId: string) {
    return this.repository.findWarehouses(tenantId);
  }

  async findOne(tenantId: string, id: string) {
    const warehouse = await this.repository.findById(tenantId, id);
    if (!warehouse) {
      throw new BaseException('Warehouse not found', 'INV-WH-404', 404);
    }
    return warehouse;
  }

  async create(tenantId: string, actionUserId: string, dto: CreateWarehouseDto) {
    const warehouse = await this.repository.createWarehouse(tenantId, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: 'CREATE',
        entityName: 'Warehouse',
        entityId: warehouse.id,
        newValues: { code: dto.code },
      },
    });

    return warehouse;
  }

  async update(tenantId: string, id: string, actionUserId: string, dto: UpdateWarehouseDto) {
    await this.findOne(tenantId, id); // check exists
    
    const warehouse = await this.repository.updateWarehouse(tenantId, id, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: 'UPDATE',
        entityName: 'Warehouse',
        entityId: id,
        newValues: dto as any,
      },
    });

    return warehouse;
  }

  async delete(tenantId: string, id: string, actionUserId: string) {
    await this.findOne(tenantId, id);
    
    await this.repository.deleteWarehouse(tenantId, id);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: 'DELETE',
        entityName: 'Warehouse',
        entityId: id,
        newValues: { deleted: true },
      },
    });

    return { success: true };
  }
}
