import { Injectable } from '@nestjs/common';
import { IAiProvider } from '../interfaces/ai-provider.interface';
import { OpenAiProvider } from './openai.provider';

@Injectable()
export class AiGatewayService {
  constructor(
    private readonly openAiProvider: OpenAiProvider
  ) {}

  getProvider(providerCode?: string): IAiProvider {
    // In the future, resolve provider from DB dynamically using providerCode
    // For now, default to OpenAiProvider
    return this.openAiProvider;
  }
}
