import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { RedisCacheService } from '../../../common/cache/redis.service';
declare const JwtRefreshStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private configService;
    private prisma;
    private redis;
    constructor(configService: ConfigService, prisma: PrismaService, redis: RedisCacheService);
    validate(request: Request, payload: any): Promise<{
        id: string;
        tenantId: string;
        email: string;
        roles: string[];
    }>;
}
export {};
