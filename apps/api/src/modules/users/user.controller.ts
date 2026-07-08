import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentUser } from '../../common/decorators/auth.decorators';
import { UserService } from './services/user.service';
import { ProfileService } from './services/profile.service';
import { UserSettingsService } from './services/user-settings.service';
import { UserSessionService } from './services/user-session.service';
import { UserActivityService } from './services/user-activity.service';
import { CreateUserDto, UpdateUserDto, UpdateProfileDto, UpdatePreferencesDto, UploadAvatarDto, DeactivateUserDto } from './dto/user.dto';
import { UserStatus } from '@prisma/client';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private readonly settingsService: UserSettingsService,
    private readonly sessionService: UserSessionService,
    private readonly activityService: UserActivityService,
  ) {}

  // ----------------------------------------------------
  // PROFILE & PREFERENCES
  // ----------------------------------------------------
  @Patch('profile')
  @ApiOperation({ summary: 'Update My Profile' })
  async updateMyProfile(@CurrentUser() user: any, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateProfile(user.tenantId, user.id, dto);
  }

  @Patch('preferences')
  @ApiOperation({ summary: 'Update My Preferences' })
  async updateMyPreferences(@CurrentUser() user: any, @Body() dto: UpdatePreferencesDto) {
    return this.settingsService.updatePreferences(user.tenantId, user.id, dto);
  }

  @Post('avatar')
  @ApiOperation({ summary: 'Update My Avatar' })
  async updateMyAvatar(@CurrentUser() user: any, @Body() dto: UploadAvatarDto) {
    return this.profileService.updateAvatar(user.tenantId, user.id, dto.avatarUrl);
  }

  @Delete('avatar')
  @ApiOperation({ summary: 'Remove My Avatar' })
  async removeMyAvatar(@CurrentUser() user: any) {
    return this.profileService.removeAvatar(user.tenantId, user.id);
  }

  // ----------------------------------------------------
  // SESSIONS & ACTIVITY
  // ----------------------------------------------------
  @Get('sessions')
  @ApiOperation({ summary: 'Get My Active Sessions' })
  async getMySessions(@CurrentUser() user: any) {
    return this.sessionService.getSessions(user.id);
  }

  @Delete('sessions/:id')
  @ApiOperation({ summary: 'Revoke a Session' })
  async revokeSession(@CurrentUser() user: any, @Param('id') sessionId: string) {
    return this.sessionService.revokeSession(user.id, sessionId);
  }

  @Get('activity')
  @ApiOperation({ summary: 'Get My Recent Activity' })
  async getMyActivity(@CurrentUser() user: any) {
    return this.activityService.getUserActivity(user.tenantId, user.id);
  }

  // ----------------------------------------------------
  // USER CRUD (Admin Only typically)
  // ----------------------------------------------------
  @Get()
  @ApiOperation({ summary: 'List Users' })
  async getUsers(@CurrentUser() user: any) {
    return this.userService.getUsers(user.tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User By ID' })
  async getUser(@CurrentUser() user: any, @Param('id') id: string) {
    return this.userService.getUserById(user.tenantId, id);
  }

  @Post()
  @ApiOperation({ summary: 'Create User' })
  async createUser(@CurrentUser() user: any, @Body() dto: CreateUserDto) {
    return this.userService.createUser(user.tenantId, user.id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update User' })
  async updateUser(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(user.tenantId, id, user.id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete User (Soft)' })
  async deleteUser(@CurrentUser() user: any, @Param('id') id: string, @Body() _dto: DeactivateUserDto) {
    return this.userService.deleteUser(user.tenantId, id, user.id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Change User Status' })
  async changeStatus(@CurrentUser() user: any, @Param('id') id: string, @Body('status') status: UserStatus) {
    return this.userService.changeStatus(user.tenantId, id, user.id, status);
  }
}
