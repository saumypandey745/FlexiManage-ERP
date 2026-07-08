import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentUser } from '../../common/decorators/auth.decorators';
import { RoleService } from './services/role.service';
import { PermissionService } from './services/permission.service';
import { RbacService } from './rbac.service';
import { PermissionCacheService } from './services/permission-cache.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { CreatePermissionDto, UpdatePermissionDto } from './dto/permission.dto';

@ApiTags('RBAC')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard)
@Controller('rbac')
export class RbacController {
  constructor(
    private readonly roleService: RoleService,
    private readonly permissionService: PermissionService,
    private readonly rbacService: RbacService,
    private readonly cache: PermissionCacheService,
  ) {}

  // ----------------------------------------------------
  // ROLES
  // ----------------------------------------------------
  @Get('roles')
  @ApiOperation({ summary: 'Get Roles' })
  async getRoles(@CurrentUser() user: any) {
    return this.roleService.getRoles(user.tenantId);
  }

  @Post('roles')
  @ApiOperation({ summary: 'Create Role' })
  async createRole(@CurrentUser() user: any, @Body() dto: CreateRoleDto) {
    return this.roleService.createRole(user.tenantId, user.id, dto);
  }

  @Patch('roles/:id')
  @ApiOperation({ summary: 'Update Role' })
  async updateRole(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.roleService.updateRole(user.tenantId, id, user.id, dto);
  }

  @Delete('roles/:id')
  @ApiOperation({ summary: 'Delete Role' })
  async deleteRole(@CurrentUser() user: any, @Param('id') id: string) {
    return this.roleService.deleteRole(user.tenantId, id, user.id);
  }

  // ----------------------------------------------------
  // PERMISSIONS
  // ----------------------------------------------------
  @Get('permissions')
  @ApiOperation({ summary: 'Get System Permissions' })
  async getPermissions() {
    return this.permissionService.getPermissions();
  }

  @Post('permissions')
  @ApiOperation({ summary: 'Create Permission (SuperAdmin Only)' })
  async createPermission(@Body() dto: CreatePermissionDto) {
    return this.permissionService.createPermission(dto);
  }

  @Patch('permissions/:id')
  @ApiOperation({ summary: 'Update Permission (SuperAdmin Only)' })
  async updatePermission(@Param('id') id: string, @Body() dto: UpdatePermissionDto) {
    return this.permissionService.updatePermission(id, dto);
  }

  @Delete('permissions/:id')
  @ApiOperation({ summary: 'Delete Permission (SuperAdmin Only)' })
  async deletePermission(@Param('id') id: string) {
    return this.permissionService.deletePermission(id);
  }

  // ----------------------------------------------------
  // ASSIGNMENTS
  // ----------------------------------------------------
  @Post('roles/:id/permissions')
  @ApiOperation({ summary: 'Assign Permission to Role' })
  async assignPermissionToRole(
    @CurrentUser() user: any,
    @Param('id') roleId: string,
    @Body('permissionId') permissionId: string,
  ) {
    return this.rbacService.assignPermissionToRole(user.tenantId, user.id, roleId, permissionId);
  }

  @Delete('roles/:id/permissions/:permissionId')
  @ApiOperation({ summary: 'Remove Permission from Role' })
  async removePermissionFromRole(
    @CurrentUser() user: any,
    @Param('id') roleId: string,
    @Param('permissionId') permissionId: string,
  ) {
    return this.rbacService.removePermissionFromRole(user.tenantId, user.id, roleId, permissionId);
  }

  @Post('users/:userId/roles')
  @ApiOperation({ summary: 'Assign Role to User' })
  async assignRoleToUser(
    @CurrentUser() user: any,
    @Param('userId') targetUserId: string,
    @Body('roleId') roleId: string,
  ) {
    return this.rbacService.assignRoleToUser(user.tenantId, user.id, targetUserId, roleId);
  }

  @Delete('users/:userId/roles/:roleId')
  @ApiOperation({ summary: 'Remove Role from User' })
  async removeRoleFromUser(
    @CurrentUser() user: any,
    @Param('userId') targetUserId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.rbacService.removeRoleFromUser(user.tenantId, user.id, targetUserId, roleId);
  }

  @Get('me/permissions')
  @ApiOperation({ summary: 'Get My Resolved Permissions' })
  async getMyPermissions(@CurrentUser() user: any) {
    return this.cache.getUserPermissions(user.id);
  }
}
