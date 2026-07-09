import { Injectable } from "@nestjs/common";
import { ExpenseRepository } from "../repositories/expense.repository";
import { CreateExpenseDto } from "../dto/finance.dto";
import { PrismaService } from "../../../common/prisma/prisma.service";

@Injectable()
export class ExpenseService {
  constructor(
    private readonly repository: ExpenseRepository,
    private readonly prisma: PrismaService
  ) {}

  async findAll(tenantId: string) {
    return this.repository.findExpenses(tenantId);
  }

  async create(tenantId: string, actionUserId: string, dto: CreateExpenseDto) {
    const expense = await this.repository.createExpense(
      tenantId,
      actionUserId,
      dto
    );

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: "CREATE",
        entityName: "ExpenseClaim",
        entityId: expense.id,
        newValues: { amount: dto.amount },
      },
    });

    return expense;
  }
}
