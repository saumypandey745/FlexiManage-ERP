import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/crm.dto';

@Injectable()
export class CustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findCustomers(tenantId: string) {
    return this.prisma.customer.findMany({
      where: { tenantId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: { assignedTo: true, contacts: true, opportunities: true },
    });
  }

  async findById(tenantId: string, id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: { assignedTo: true, contacts: true, opportunities: true, notes: true },
    });
    if (!customer || customer.tenantId !== tenantId || customer.deletedAt) return null;
    return customer;
  }

  async createCustomer(tenantId: string, dto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: { ...dto, tenantId },
    });
  }

  async updateCustomer(tenantId: string, id: string, dto: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: { id, tenantId },
      data: dto,
    });
  }

  async deleteCustomer(tenantId: string, id: string) {
    return this.prisma.customer.update({
      where: { id, tenantId },
      data: { deletedAt: new Date() },
    });
  }
}
