import { Injectable } from "@nestjs/common";
import { PayrollRepository } from "../repositories/payroll.repository";
import { CreatePayrollDto } from "../dto/hrms.dto";
import { PrismaService } from "../../../common/prisma/prisma.service";

@Injectable()
export class PayrollService {
  constructor(
    private readonly repository: PayrollRepository,
    private readonly prisma: PrismaService
  ) {}

  async findAll(tenantId: string) {
    return this.repository.findPayrolls(tenantId);
  }

  async generate(
    tenantId: string,
    actionUserId: string,
    employeeId: string,
    dto: CreatePayrollDto
  ) {
    const payroll = await this.repository.generatePayroll(
      tenantId,
      employeeId,
      dto
    );

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: "CREATE",
        entityName: "Payroll",
        entityId: payroll.id,
        newValues: { month: dto.month, year: dto.year },
      },
    });

    return payroll;
  }
}
