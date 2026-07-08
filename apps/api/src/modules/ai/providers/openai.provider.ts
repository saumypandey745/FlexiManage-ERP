import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAiProvider, AiChatOptions, AiChatResult } from '../interfaces/ai-provider.interface';
import OpenAI from 'openai';

@Injectable()
export class OpenAiProvider implements IAiProvider {
  private readonly logger = new Logger(OpenAiProvider.name);
  private openai: OpenAI;
  private readonly defaultModel = 'gpt-4o';

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.openai = new OpenAI({ apiKey });
  }

  async chat(options: AiChatOptions): Promise<AiChatResult> {
    const model = (options as any).model || this.defaultModel;
    
    try {
      const response = await this.openai.chat.completions.create({
        model,
        messages: options.messages as OpenAI.ChatCompletionMessageParam[],
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens,
      });

      return {
        content: response.choices[0]?.message?.content || '',
        usage: {
          promptTokens: response.usage?.prompt_tokens || 0,
          completionTokens: response.usage?.completion_tokens || 0,
          totalTokens: response.usage?.total_tokens || 0
        },
        model: response.model
      };
    } catch (error) {
      this.logger.error(`Failed to execute OpenAI chat: ${error.message}`);
      throw error;
    }
  }

  async streamChat(options: AiChatOptions, onChunk: (chunk: string) => void): Promise<AiChatResult> {
    const model = (options as any).model || this.defaultModel;
    
    try {
      const stream = await this.openai.chat.completions.create({
        model,
        messages: options.messages as OpenAI.ChatCompletionMessageParam[],
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens,
        stream: true,
      });

      let fullContent = '';
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          fullContent += content;
          onChunk(content);
        }
      }

      // In a real streaming scenario, we don't always get exact token usage unless requested specifically (stream_options).
      // Assuming a basic character based estimation for now or zero.
      return {
        content: fullContent,
        usage: {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0
        },
        model
      };
    } catch (error) {
      this.logger.error(`Failed to stream OpenAI chat: ${error.message}`);
      throw error;
    }
  }

  async embed(text: string): Promise<number[]> {
    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
      });
      return response.data[0].embedding;
    } catch (error) {
      this.logger.error(`Failed to execute OpenAI embed: ${error.message}`);
      throw error;
    }
  }
}
