import { Injectable } from "@nestjs/common";
import { ProductRepository } from "../repositories/product.repository";
import { CreateProductDto, UpdateProductDto } from "../dto/inventory.dto";
import { BaseException } from "../../../common/exceptions/base.exception";
import { PrismaService } from "../../../common/prisma/prisma.service";

@Injectable()
export class ProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly prisma: PrismaService
  ) {}

  async findAll(tenantId: string) {
    return this.repository.findProducts(tenantId);
  }

  async findOne(tenantId: string, id: string) {
    const product = await this.repository.findById(tenantId, id);
    if (!product) {
      throw new BaseException("Product not found", "INV-PROD-404", 404);
    }
    return product;
  }

  async create(tenantId: string, actionUserId: string, dto: CreateProductDto) {
    const product = await this.repository.createProduct(tenantId, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: "CREATE",
        entityName: "Product",
        entityId: product.id,
        newValues: { sku: dto.sku },
      },
    });

    return product;
  }

  async update(
    tenantId: string,
    id: string,
    actionUserId: string,
    dto: UpdateProductDto
  ) {
    await this.findOne(tenantId, id); // Ensure exists

    const product = await this.repository.updateProduct(tenantId, id, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: "UPDATE",
        entityName: "Product",
        entityId: product.id,
        newValues: dto as any,
      },
    });

    return product;
  }

  async delete(tenantId: string, id: string, actionUserId: string) {
    await this.findOne(tenantId, id);

    await this.repository.deleteProduct(tenantId, id);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: "DELETE",
        entityName: "Product",
        entityId: id,
        newValues: { deleted: true },
      },
    });

    return { success: true };
  }
}
