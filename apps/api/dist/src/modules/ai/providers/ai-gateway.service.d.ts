import { IAiProvider } from '../interfaces/ai-provider.interface';
import { OpenAiProvider } from './openai.provider';
export declare class AiGatewayService {
    private readonly openAiProvider;
    constructor(openAiProvider: OpenAiProvider);
    getProvider(providerCode?: string): IAiProvider;
}
