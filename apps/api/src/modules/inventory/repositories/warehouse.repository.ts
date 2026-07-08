import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateWarehouseDto, UpdateWarehouseDto } from '../dto/inventory.dto';
import { BaseException } from '../../../common/exceptions/base.exception';

@Injectable()
export class WarehouseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findWarehouses(tenantId: string) {
    return this.prisma.warehouse.findMany({
      where: { tenantId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: { manager: true },
    });
  }

  async findById(tenantId: string, id: string) {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id },
      include: { manager: true, stockItems: { include: { product: true } } },
    });
    if (!warehouse || warehouse.tenantId !== tenantId || warehouse.deletedAt) return null;
    return warehouse;
  }

  async createWarehouse(tenantId: string, dto: CreateWarehouseDto) {
    const existing = await this.prisma.warehouse.findFirst({
      where: { tenantId, code: dto.code, deletedAt: null },
    });
    
    if (existing) {
      throw new BaseException('Warehouse with this code already exists', 'INV-WH-409', 409);
    }

    return this.prisma.warehouse.create({
      data: { ...dto, tenantId },
    });
  }

  async updateWarehouse(tenantId: string, id: string, dto: UpdateWarehouseDto) {
    return this.prisma.warehouse.update({
      where: { id, tenantId },
      data: dto,
    });
  }

  async deleteWarehouse(tenantId: string, id: string) {
    return this.prisma.warehouse.update({
      where: { id, tenantId },
      data: { deletedAt: new Date(), status: 'CLOSED' },
    });
  }
}
