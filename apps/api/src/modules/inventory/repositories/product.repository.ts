import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from '../dto/inventory.dto';
import { BaseException } from '../../../common/exceptions/base.exception';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findProducts(tenantId: string) {
    return this.prisma.product.findMany({
      where: { tenantId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: { category: true, stockItems: true },
    });
  }

  async findById(tenantId: string, id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true, stockItems: true, variants: true },
    });
    if (!product || product.tenantId !== tenantId || product.deletedAt) return null;
    return product;
  }

  async createProduct(tenantId: string, dto: CreateProductDto) {
    const existing = await this.prisma.product.findFirst({
      where: { tenantId, sku: dto.sku, deletedAt: null },
    });
    
    if (existing) {
      throw new BaseException('Product with this SKU already exists', 'INV-PROD-409', 409);
    }

    return this.prisma.product.create({
      data: { ...dto, tenantId },
    });
  }

  async updateProduct(tenantId: string, id: string, dto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id, tenantId },
      data: dto,
    });
  }

  async deleteProduct(tenantId: string, id: string) {
    return this.prisma.product.update({
      where: { id, tenantId },
      data: { deletedAt: new Date() },
    });
  }
}
