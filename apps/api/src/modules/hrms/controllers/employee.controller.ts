import { Controller, Get, Post, Body, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto/hrms.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('HRMS Employees')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard)
@Controller('hrms/employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiOperation({ summary: 'Create Employee' })
  create(@Req() req: any, @Body() createDto: CreateEmployeeDto) {
    return this.employeeService.create(req.user.tenantId, req.user.id, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'List Employees' })
  findAll(@Req() req: any) {
    return this.employeeService.findAll(req.user.tenantId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Employee' })
  update(@Req() req: any, @Param('id') id: string, @Body() updateDto: UpdateEmployeeDto) {
    return this.employeeService.update(req.user.tenantId, id, req.user.id, updateDto);
  }
}
