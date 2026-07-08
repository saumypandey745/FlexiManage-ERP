import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'token12345' })
  @IsString()
  @IsNotEmpty()
  token!: string;

  @ApiProperty({ example: 'NewP@ssw0rd123!', minLength: 12 })
  @IsString()
  @IsNotEmpty()
  @MinLength(12)
  @Matches(/(?=.*[A-Z])/)
  @Matches(/(?=.*[0-9])/)
  @Matches(/(?=.*[!@#$%^&*])/)
  newPassword!: string;
}

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  currentPassword!: string;

  @ApiProperty({ minLength: 12 })
  @IsString()
  @IsNotEmpty()
  @MinLength(12)
  @Matches(/(?=.*[A-Z])/)
  @Matches(/(?=.*[0-9])/)
  @Matches(/(?=.*[!@#$%^&*])/)
  newPassword!: string;
}
