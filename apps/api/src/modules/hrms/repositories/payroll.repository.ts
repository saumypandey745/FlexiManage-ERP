import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreatePayrollDto } from '../dto/hrms.dto';

@Injectable()
export class PayrollRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPayrolls(tenantId: string) {
    return this.prisma.payroll.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      include: { employee: true },
    });
  }

  async generatePayroll(tenantId: string, employeeId: string, dto: CreatePayrollDto) {
    // simplified implementation
    return this.prisma.payroll.create({
      data: {
        tenantId,
        employeeId,
        month: dto.month,
        year: dto.year,
        basicSalary: 5000,
        netSalary: 4500,
      },
    });
  }
}
