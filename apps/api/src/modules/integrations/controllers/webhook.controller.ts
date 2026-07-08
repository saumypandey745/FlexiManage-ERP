import { Controller, Get, Post, Body, Param, Headers, UseGuards, Req } from '@nestjs/common';
import { WebhookService } from '../services/webhook.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/auth.decorators';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiHeader } from '@nestjs/swagger';

@ApiTags('webhooks')
@Controller('webhooks')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post(':provider')
  @ApiOperation({ summary: 'Receive an incoming webhook from an external provider' })
  @ApiHeader({ name: 'x-hub-signature', description: 'Provider Signature', required: false })
  async handleWebhook(
    @Param('provider') provider: string,
    @Body() payload: any,
    @Headers('x-hub-signature') signature?: string,
    @Headers('stripe-signature') stripeSignature?: string
  ) {
    // Unify signatures
    const activeSignature = signature || stripeSignature;
    return this.webhookService.handleIncomingWebhook(provider, payload, activeSignature);
  }

  @Get('logs')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'List webhook delivery logs' })
  async getLogs(@Req() req: any) {
    return this.webhookService.getWebhookLogs(req.user.tenantId);
  }
}
