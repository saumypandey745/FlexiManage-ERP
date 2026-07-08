import { WebhookService } from '../services/webhook.service';
export declare class WebhookController {
    private readonly webhookService;
    constructor(webhookService: WebhookService);
    handleWebhook(provider: string, payload: any, signature?: string, stripeSignature?: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getLogs(req: any): Promise<never[]>;
}
