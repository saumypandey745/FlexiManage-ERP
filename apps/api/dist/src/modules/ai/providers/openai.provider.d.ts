import { IAiProvider, AiChatOptions, AiChatResult } from '../interfaces/ai-provider.interface';
export declare class OpenAiProvider implements IAiProvider {
    private readonly model;
    chat(options: AiChatOptions): Promise<AiChatResult>;
    streamChat(options: AiChatOptions, onChunk: (chunk: string) => void): Promise<AiChatResult>;
    embed(text: string): Promise<number[]>;
}
