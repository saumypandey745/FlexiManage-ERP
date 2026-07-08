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
var RedisCacheService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ioredis_1 = require("ioredis");
let RedisCacheService = RedisCacheService_1 = class RedisCacheService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(RedisCacheService_1.name);
        const url = this.configService.get('REDIS_URL');
        if (url) {
            this.client = new ioredis_1.default(url);
            this.logger.log('Redis connected successfully.');
        }
        else {
            this.logger.warn('REDIS_URL not found. Cache disabled.');
        }
    }
    async set(key, value, ttl) {
        if (!this.client)
            return;
        const stringValue = JSON.stringify(value);
        if (ttl) {
            await this.client.set(key, stringValue, 'EX', ttl);
        }
        else {
            await this.client.set(key, stringValue);
        }
    }
    async get(key) {
        if (!this.client)
            return null;
        const value = await this.client.get(key);
        return value ? JSON.parse(value) : null;
    }
    async del(key) {
        if (!this.client)
            return;
        await this.client.del(key);
    }
    async onModuleDestroy() {
        if (this.client) {
            await this.client.quit();
        }
    }
};
exports.RedisCacheService = RedisCacheService;
exports.RedisCacheService = RedisCacheService = RedisCacheService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RedisCacheService);
//# sourceMappingURL=redis.service.js.map