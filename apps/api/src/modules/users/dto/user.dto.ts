import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsEnum, IsBoolean } from 'class-validator';
import { UserStatus } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'Password123!' })
  @IsString()
  @IsNotEmpty()
  password!: string;

  @ApiProperty({ enum: UserStatus, default: UserStatus.INVITED })
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateProfileDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: '+1-555-1234' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'Software Engineer' })
  @IsString()
  @IsOptional()
  bio?: string;
}

export class UpdatePreferencesDto {
  @ApiProperty({ example: 'UTC' })
  @IsString()
  @IsOptional()
  timezone?: string;

  @ApiProperty({ example: 'en' })
  @IsString()
  @IsOptional()
  language?: string;

  @ApiProperty({ example: 'dark' })
  @IsString()
  @IsOptional()
  theme?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  notifications?: boolean;
}

export class ChangeEmailDto {
  @ApiProperty({ example: 'new.email@example.com' })
  @IsEmail()
  @IsNotEmpty()
  newEmail!: string;
}

export class UploadAvatarDto {
  @ApiProperty({ example: 'https://example.com/avatar.jpg' })
  @IsString()
  @IsNotEmpty()
  avatarUrl!: string;
}

export class DeactivateUserDto {
  @ApiProperty({ example: 'Offboarding' })
  @IsString()
  @IsOptional()
  reason?: string;
}

export class UserResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty({ enum: UserStatus })
  status!: UserStatus;
}
