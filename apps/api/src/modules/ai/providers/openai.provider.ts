import { Injectable } from '@nestjs/common';
import { IAiProvider, AiChatOptions, AiChatResult } from '../interfaces/ai-provider.interface';

@Injectable()
export class OpenAiProvider implements IAiProvider {
  private readonly model = 'gpt-4o';

  async chat(options: AiChatOptions): Promise<AiChatResult> {
    // In a real implementation, we would use the OpenAI SDK:
    // const response = await openai.chat.completions.create({...})
    
    return {
      content: 'This is a mock response from OpenAI provider.',
      usage: {
        promptTokens: 10,
        completionTokens: 20,
        totalTokens: 30
      },
      model: this.model
    };
  }

  async streamChat(options: AiChatOptions, onChunk: (chunk: string) => void): Promise<AiChatResult> {
    const chunks = ['This ', 'is ', 'a ', 'mock ', 'stream ', 'response.'];
    
    for (const chunk of chunks) {
      onChunk(chunk);
      await new Promise(resolve => setTimeout(resolve, 100)); // simulate latency
    }

    return {
      content: chunks.join(''),
      usage: {
        promptTokens: 10,
        completionTokens: 20,
        totalTokens: 30
      },
      model: this.model
    };
  }

  async embed(text: string): Promise<number[]> {
    // Mock 1536 dimensional vector
    return Array.from({ length: 1536 }, () => Math.random());
  }
}
