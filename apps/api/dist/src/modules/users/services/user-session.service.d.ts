import { RedisCacheService } from '../../../common/cache/redis.service';
export declare class UserSessionService {
    private readonly redis;
    constructor(redis: RedisCacheService);
    trackSession(userId: string, sessionId: string, meta: any): Promise<void>;
    getSessions(userId: string): Promise<any>;
    revokeSession(userId: string, sessionId: string): Promise<void>;
}
