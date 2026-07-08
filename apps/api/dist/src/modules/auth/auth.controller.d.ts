import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterTenantDto } from './dto/register.dto';
import { ForgotPasswordDto, ResetPasswordDto, ChangePasswordDto } from './dto/password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterTenantDto, res: Response): Promise<{
        accessToken: string;
        user: {
            id: any;
            email: any;
            tenantId: any;
        };
    }>;
    login(dto: LoginDto, req: Request, res: Response): Promise<{
        accessToken: string;
        user: {
            id: any;
            email: any;
            tenantId: any;
        };
    }>;
    logout(user: any, req: Request, res: Response): Promise<{
        message: string;
    }>;
    refresh(user: any, req: Request, res: Response): Promise<{
        accessToken: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    changePassword(user: any, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    getProfile(user: any): any;
    private setRefreshCookie;
}
