import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisCacheService implements OnModuleDestroy {
  private readonly client: Redis;
  private readonly logger = new Logger(RedisCacheService.name);

  constructor(private configService: ConfigService) {
    const url = this.configService.get<string>('REDIS_URL');
    if (url) {
      this.client = new Redis(url);
      this.logger.log('Redis connected successfully.');
    } else {
      this.logger.warn('REDIS_URL not found. Cache disabled.');
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    if (!this.client) return;
    const stringValue = JSON.stringify(value);
    if (ttl) {
      await this.client.set(key, stringValue, 'EX', ttl);
    } else {
      await this.client.set(key, stringValue);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.client) return null;
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async del(key: string): Promise<void> {
    if (!this.client) return;
    await this.client.del(key);
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.quit();
    }
  }
}
