import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Resend } from "resend";

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private resend: Resend;
  private defaultFrom = "FlexiManage <no-reply@fleximanage.com>";

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>("RESEND_API_KEY");
    this.resend = new Resend(apiKey);
  }

  async sendWelcomeEmail(email: string, firstName: string): Promise<void> {
    try {
      await this.resend.emails.send({
        from: this.defaultFrom,
        to: email,
        subject: `Welcome to FlexiManage, ${firstName}!`,
        html: `<p>Hi ${firstName},</p><p>Welcome to FlexiManage! We're thrilled to have you.</p>`,
      });
      this.logger.log(`[EmailService] Sent Welcome Email to ${email}`);
    } catch (error) {
      this.logger.error(
        `[EmailService] Failed to send Welcome Email to ${email}`,
        error.stack
      );
    }
  }

  async sendVerifyEmail(email: string, token: string): Promise<void> {
    const frontendUrl = this.configService.get<string>("FRONTEND_URL");
    const verifyLink = `${frontendUrl}/auth/verify?token=${token}`;

    try {
      await this.resend.emails.send({
        from: this.defaultFrom,
        to: email,
        subject: "Verify your email address",
        html: `<p>Please click the link below to verify your email address:</p><p><a href="${verifyLink}">${verifyLink}</a></p>`,
      });
      this.logger.log(`[EmailService] Sent Verify Email to ${email}`);
    } catch (error) {
      this.logger.error(
        `[EmailService] Failed to send Verify Email to ${email}`,
        error.stack
      );
    }
  }

  async sendForgotPassword(email: string, token: string): Promise<void> {
    const frontendUrl = this.configService.get<string>("FRONTEND_URL");
    const resetLink = `${frontendUrl}/auth/reset-password?token=${token}`;

    try {
      await this.resend.emails.send({
        from: this.defaultFrom,
        to: email,
        subject: "Reset your password",
        html: `<p>You requested a password reset. Click the link below to reset it:</p><p><a href="${resetLink}">${resetLink}</a></p>`,
      });
      this.logger.log(`[EmailService] Sent Forgot Password to ${email}`);
    } catch (error) {
      this.logger.error(
        `[EmailService] Failed to send Forgot Password to ${email}`,
        error.stack
      );
    }
  }

  async sendPasswordResetSuccess(email: string): Promise<void> {
    try {
      await this.resend.emails.send({
        from: this.defaultFrom,
        to: email,
        subject: "Password reset successful",
        html: `<p>Your password has been successfully reset.</p>`,
      });
      this.logger.log(`[EmailService] Sent Password Reset Success to ${email}`);
    } catch (error) {
      this.logger.error(
        `[EmailService] Failed to send Password Reset Success to ${email}`,
        error.stack
      );
    }
  }

  async sendInviteUser(
    email: string,
    inviterName: string,
    companyName: string,
    token: string
  ): Promise<void> {
    const frontendUrl = this.configService.get<string>("FRONTEND_URL");
    const inviteLink = `${frontendUrl}/auth/accept-invite?token=${token}`;

    try {
      await this.resend.emails.send({
        from: this.defaultFrom,
        to: email,
        subject: `You've been invited to join ${companyName} on FlexiManage`,
        html: `<p>${inviterName} has invited you to join their team on FlexiManage.</p><p><a href="${inviteLink}">Accept Invitation</a></p>`,
      });
      this.logger.log(`[EmailService] Sent Invite Email to ${email}`);
    } catch (error) {
      this.logger.error(
        `[EmailService] Failed to send Invite Email to ${email}`,
        error.stack
      );
    }
  }

  async sendGenericEmail(
    to: string,
    subject: string,
    html: string
  ): Promise<void> {
    try {
      await this.resend.emails.send({
        from: this.defaultFrom,
        to,
        subject,
        html,
      });
      this.logger.log(`[EmailService] Sent Generic Email to ${to}`);
    } catch (error) {
      this.logger.error(
        `[EmailService] Failed to send Generic Email to ${to}`,
        error.stack
      );
    }
  }
}
