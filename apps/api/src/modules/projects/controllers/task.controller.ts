import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { CreateTaskDto, UpdateTaskDto, AssignTaskDto } from '../dto/task.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/auth.decorators';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Roles('ADMIN', 'PROJECT_MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'Create a new task' })
  create(@Req() req: any, @Body() dto: CreateTaskDto) {
    return this.taskService.create(req.user.tenantId, req.user.id, dto);
  }

  @Get()
  @Roles('ADMIN', 'PROJECT_MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'Get all tasks' })
  findAll(
    @Req() req: any,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.taskService.findAll(req.user.tenantId, +(page || 1), +(limit || 10));
  }

  @Get(':id')
  @Roles('ADMIN', 'PROJECT_MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'Get a task by ID' })
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.taskService.findOne(req.user.tenantId, id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'PROJECT_MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'Update a task' })
  update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.taskService.update(req.user.tenantId, req.user.id, id, dto);
  }

  @Patch(':id/assign')
  @Roles('ADMIN', 'PROJECT_MANAGER')
  @ApiOperation({ summary: 'Assign a task' })
  assign(@Req() req: any, @Param('id') id: string, @Body() dto: AssignTaskDto) {
    return this.taskService.assign(req.user.tenantId, req.user.id, id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'PROJECT_MANAGER')
  @ApiOperation({ summary: 'Delete a task' })
  remove(@Req() req: any, @Param('id') id: string) {
    return this.taskService.remove(req.user.tenantId, req.user.id, id);
  }
}
