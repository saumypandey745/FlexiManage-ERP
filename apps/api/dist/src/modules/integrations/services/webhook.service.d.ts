import { IntegrationRepository } from '../repositories/integration.repository';
export declare class WebhookService {
    private readonly repo;
    private readonly logger;
    constructor(repo: IntegrationRepository);
    handleIncomingWebhook(provider: string, payload: any, signature?: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getWebhookLogs(tenantId: string): Promise<never[]>;
}
