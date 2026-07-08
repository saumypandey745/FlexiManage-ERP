import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../repositories/employee.repository';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto/hrms.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly repository: EmployeeRepository,
    private readonly prisma: PrismaService,
  ) {}

  async findAll(tenantId: string) {
    return this.repository.findEmployees(tenantId);
  }

  async create(tenantId: string, actionUserId: string, dto: CreateEmployeeDto) {
    const employee = await this.repository.createEmployee(tenantId, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: 'CREATE',
        entityName: 'Employee',
        entityId: employee.id,
        newValues: { employeeCode: dto.employeeCode },
      },
    });

    return employee;
  }

  async update(tenantId: string, id: string, actionUserId: string, dto: UpdateEmployeeDto) {
    const employee = await this.repository.updateEmployee(tenantId, id, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: 'UPDATE',
        entityName: 'Employee',
        entityId: employee.id,
        newValues: dto as any,
      },
    });

    return employee;
  }
}
