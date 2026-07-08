import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService);
    sendWelcomeEmail(email: string, firstName: string): Promise<void>;
    sendVerifyEmail(email: string, token: string): Promise<void>;
    sendForgotPassword(email: string, token: string): Promise<void>;
    sendPasswordResetSuccess(email: string): Promise<void>;
    sendInviteUser(email: string, inviterName: string, companyName: string, token: string): Promise<void>;
}
