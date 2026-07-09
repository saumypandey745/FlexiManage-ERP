import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import {
  HealthCheckService,
  HttpHealthIndicator,
  PrismaHealthIndicator,
  MicroserviceHealthIndicator,
} from "@nestjs/terminus";
import { PrismaService } from "../../common/prisma/prisma.service";
import { RedisOptions, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

@ApiTags("health")
@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private prisma: PrismaHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  @Get()
  @ApiOperation({ summary: "General health check" })
  check() {
    return this.health.check([
      () => this.prisma.pingCheck("database", this.prismaService),
    ]);
  }

  @Get("live")
  @ApiOperation({ summary: "Liveness probe for Kubernetes" })
  liveness() {
    return { status: "live" };
  }

  @Get("ready")
  @ApiOperation({ summary: "Readiness probe for Kubernetes" })
  readiness() {
    return this.health.check([
      () => this.prisma.pingCheck("database", this.prismaService),
    ]);
  }

  @Get("database")
  @ApiOperation({ summary: "Database health check" })
  database() {
    return this.health.check([
      () => this.prisma.pingCheck("database", this.prismaService),
    ]);
  }

  @Get("redis")
  @ApiOperation({ summary: "Redis health check" })
  redis() {
    const redisUrl =
      this.configService.get<string>("REDIS_URL") || "redis://localhost:6379";
    return this.health.check([
      () =>
        this.microservice.pingCheck<RedisOptions>("redis", {
          transport: Transport.REDIS,
          options: {
            host: redisUrl.split(":")[1]?.replace("//", "") || "localhost",
            port: parseInt(redisUrl.split(":")[2]) || 6379,
          },
        }),
    ]);
  }
}
