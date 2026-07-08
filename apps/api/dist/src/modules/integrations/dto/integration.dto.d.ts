export declare class ConnectIntegrationDto {
    provider: string;
    category: string;
    name: string;
    credentials?: Record<string, string>;
    configuration?: Record<string, any>;
}
export declare class UpdateIntegrationDto {
    name?: string;
    configuration?: Record<string, any>;
}
export declare class WebhookEndpointDto {
    url: string;
    events: string[];
    secret?: string;
}
