import { BillingRepository } from '../repositories/billing.repository';
export declare class BillingWebhookService {
    private readonly repo;
    private readonly logger;
    constructor(repo: BillingRepository);
    handleStripeWebhook(payload: any, signature: string): Promise<{
        success: boolean;
    }>;
    handlePaypalWebhook(payload: any, signature: string): Promise<{
        success: boolean;
    }>;
    handleRazorpayWebhook(payload: any, signature: string): Promise<{
        success: boolean;
    }>;
}
