import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ExpenseService } from '../services/expense.service';
import { CreateExpenseDto } from '../dto/finance.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Finance Expenses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard)
@Controller('finance/expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({ summary: 'Submit Expense Claim' })
  create(@Req() req: any, @Body() createDto: CreateExpenseDto) {
    return this.expenseService.create(req.user.tenantId, req.user.id, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'List Expense Claims' })
  findAll(@Req() req: any) {
    return this.expenseService.findAll(req.user.tenantId);
  }
}
