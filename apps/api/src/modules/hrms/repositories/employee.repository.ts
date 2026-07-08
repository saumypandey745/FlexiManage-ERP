import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto/hrms.dto';
import { BaseException } from '../../../common/exceptions/base.exception';

@Injectable()
export class EmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findEmployees(tenantId: string) {
    return this.prisma.employee.findMany({
      where: { tenantId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: { profile: true, department: true },
    });
  }

  async findById(tenantId: string, id: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: { profile: true, department: true },
    });
    if (!employee || employee.tenantId !== tenantId || employee.deletedAt) return null;
    return employee;
  }

  async createEmployee(tenantId: string, dto: CreateEmployeeDto) {
    const existing = await this.prisma.employee.findFirst({
      where: { tenantId, employeeCode: dto.employeeCode, deletedAt: null },
    });
    if (existing) {
      throw new BaseException('Employee code already exists', 'HRMS-EMP-409', 409);
    }
    return this.prisma.employee.create({
      data: {
        tenantId,
        employeeCode: dto.employeeCode,
        firstName: dto.firstName,
        lastName: dto.lastName,
        status: dto.status,
      },
    });
  }

  async updateEmployee(tenantId: string, id: string, dto: UpdateEmployeeDto) {
    const existing = await this.findById(tenantId, id);
    if (!existing) {
      throw new BaseException('Employee not found', 'HRMS-EMP-404', 404);
    }
    return this.prisma.employee.update({
      where: { id },
      data: dto,
    });
  }
}
