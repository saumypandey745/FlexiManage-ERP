import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './services/user.service';
import { ProfileService } from './services/profile.service';
import { UserSettingsService } from './services/user-settings.service';
import { UserSessionService } from './services/user-session.service';
import { UserActivityService } from './services/user-activity.service';

@Module({
  controllers: [UserController],
  providers: [
    UserRepository,
    UserService,
    ProfileService,
    UserSettingsService,
    UserSessionService,
    UserActivityService,
  ],
  exports: [
    UserService,
    ProfileService,
  ],
})
export class UserModule {}
