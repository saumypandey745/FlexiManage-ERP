import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { PayrollService } from '../services/payroll.service';
import { CreatePayrollDto } from '../dto/hrms.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('HRMS Payroll')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard)
@Controller('hrms/payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post(':employeeId')
  @ApiOperation({ summary: 'Generate Payroll' })
  generate(@Req() req: any, @Param('employeeId') employeeId: string, @Body() dto: CreatePayrollDto) {
    return this.payrollService.generate(req.user.tenantId, req.user.id, employeeId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List Payrolls' })
  findAll(@Req() req: any) {
    return this.payrollService.findAll(req.user.tenantId);
  }
}
