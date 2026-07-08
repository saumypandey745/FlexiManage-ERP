import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly configService: ConfigService) {}

  async sendWelcomeEmail(email: string, firstName: string): Promise<void> {
    this.logger.log(`[EmailService] Sending Welcome Email to ${email} for ${firstName}`);
    // In production, integrate with SendGrid, SES, or Mailgun
  }

  async sendVerifyEmail(email: string, token: string): Promise<void> {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    const verifyLink = `${frontendUrl}/auth/verify?token=${token}`;
    this.logger.log(`[EmailService] Sending Verify Email to ${email}. Link: ${verifyLink}`);
  }

  async sendForgotPassword(email: string, token: string): Promise<void> {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    const resetLink = `${frontendUrl}/auth/reset-password?token=${token}`;
    this.logger.log(`[EmailService] Sending Forgot Password to ${email}. Link: ${resetLink}`);
  }

  async sendPasswordResetSuccess(email: string): Promise<void> {
    this.logger.log(`[EmailService] Sending Password Reset Success to ${email}`);
  }

  async sendInviteUser(email: string, inviterName: string, companyName: string, token: string): Promise<void> {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    const inviteLink = `${frontendUrl}/auth/accept-invite?token=${token}`;
    this.logger.log(`[EmailService] Sending Invite from ${inviterName} at ${companyName} to ${email}. Link: ${inviteLink}`);
  }
}
