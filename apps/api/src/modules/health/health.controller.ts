import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  
  @Get()
  @ApiOperation({ summary: 'General health check' })
  check() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Get('live')
  @ApiOperation({ summary: 'Liveness probe for Kubernetes' })
  liveness() {
    return { status: 'live' };
  }

  @Get('ready')
  @ApiOperation({ summary: 'Readiness probe for Kubernetes' })
  readiness() {
    // In a real scenario, this would check DB connections, Redis, etc.
    return { status: 'ready' };
  }

  @Get('database')
  @ApiOperation({ summary: 'Database health check' })
  database() {
    return { status: 'ok', component: 'database' };
  }

  @Get('redis')
  @ApiOperation({ summary: 'Redis health check' })
  redis() {
    return { status: 'ok', component: 'redis' };
  }
}
