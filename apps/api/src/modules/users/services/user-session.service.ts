import { Injectable } from '@nestjs/common';
import { RedisCacheService } from '../../../common/cache/redis.service';

@Injectable()
export class UserSessionService {
  constructor(private readonly redis: RedisCacheService) {}

  /**
   * Track an active session in Redis
   */
  async trackSession(userId: string, sessionId: string, meta: any) {
    const key = `user_sessions:${userId}`;
    const sessionsStr = await this.redis.get<string>(key);
    let sessions: Record<string, any> = sessionsStr ? JSON.parse(sessionsStr) : {};
    
    sessions[sessionId] = {
      ...meta,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
    };

    // Sessions expire if not active for 24h
    await this.redis.set(key, JSON.stringify(sessions), 24 * 60 * 60);
  }

  /**
   * Get all active sessions for a user
   */
  async getSessions(userId: string) {
    const key = `user_sessions:${userId}`;
    const sessionsStr = await this.redis.get<string>(key);
    return sessionsStr ? JSON.parse(sessionsStr) : {};
  }

  /**
   * Revoke a specific session
   */
  async revokeSession(userId: string, sessionId: string) {
    const key = `user_sessions:${userId}`;
    const sessionsStr = await this.redis.get<string>(key);
    if (!sessionsStr) return;

    let sessions: Record<string, any> = JSON.parse(sessionsStr);
    delete sessions[sessionId];

    // In a real implementation, you would also add this sessionId to a blacklist 
    // so the token cannot be used anymore.
    await this.redis.set(key, JSON.stringify(sessions), 24 * 60 * 60);
  }
}
