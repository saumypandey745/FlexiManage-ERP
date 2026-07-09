import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { CreateExpenseDto } from "../dto/finance.dto";

@Injectable()
export class ExpenseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findExpenses(tenantId: string) {
    return this.prisma.expenseClaim.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" },
      include: { category: true, user: true },
    });
  }

  async createExpense(tenantId: string, userId: string, dto: CreateExpenseDto) {
    return this.prisma.expenseClaim.create({
      data: {
        tenantId,
        userId,
        categoryId: dto.categoryId,
        amount: dto.amount,
        date: new Date(dto.date),
        description: dto.description,
      },
      include: { category: true },
    });
  }
}
