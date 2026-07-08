import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../repositories/customer.repository';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/crm.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(
    private readonly repo: CustomerRepository,
    private readonly prisma: PrismaService,
  ) {}

  async getCustomers(tenantId: string) {
    return this.repo.findCustomers(tenantId);
  }

  async getCustomerById(tenantId: string, id: string) {
    return this.repo.findById(tenantId, id);
  }

  async createCustomer(tenantId: string, actionUserId: string, dto: CreateCustomerDto) {
    const customer = await this.repo.createCustomer(tenantId, dto);
    
    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: 'CREATE',
        entityName: 'Customer',
        entityId: customer.id,
        newValues: dto as any,
      },
    });

    return customer;
  }

  async updateCustomer(tenantId: string, id: string, actionUserId: string, dto: UpdateCustomerDto) {
    const customer = await this.repo.updateCustomer(tenantId, id, dto);
    
    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: 'UPDATE',
        entityName: 'Customer',
        entityId: customer.id,
        newValues: dto as any,
      },
    });

    return customer;
  }

  async deleteCustomer(tenantId: string, id: string, actionUserId: string) {
    const customer = await this.repo.deleteCustomer(tenantId, id);
    
    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: 'DELETE',
        entityName: 'Customer',
        entityId: customer.id,
      },
    });

    return customer;
  }
}
