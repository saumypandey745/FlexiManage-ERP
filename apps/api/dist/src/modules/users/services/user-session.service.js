"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSessionService = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../../../common/cache/redis.service");
let UserSessionService = class UserSessionService {
    constructor(redis) {
        this.redis = redis;
    }
    async trackSession(userId, sessionId, meta) {
        const key = `user_sessions:${userId}`;
        const sessionsStr = await this.redis.get(key);
        let sessions = sessionsStr ? JSON.parse(sessionsStr) : {};
        sessions[sessionId] = {
            ...meta,
            createdAt: new Date().toISOString(),
            lastActive: new Date().toISOString(),
        };
        await this.redis.set(key, JSON.stringify(sessions), 24 * 60 * 60);
    }
    async getSessions(userId) {
        const key = `user_sessions:${userId}`;
        const sessionsStr = await this.redis.get(key);
        return sessionsStr ? JSON.parse(sessionsStr) : {};
    }
    async revokeSession(userId, sessionId) {
        const key = `user_sessions:${userId}`;
        const sessionsStr = await this.redis.get(key);
        if (!sessionsStr)
            return;
        let sessions = JSON.parse(sessionsStr);
        delete sessions[sessionId];
        await this.redis.set(key, JSON.stringify(sessions), 24 * 60 * 60);
    }
};
exports.UserSessionService = UserSessionService;
exports.UserSessionService = UserSessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisCacheService])
], UserSessionService);
//# sourceMappingURL=user-session.service.js.map