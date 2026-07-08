export interface AiChatOptions {
  systemPrompt?: string;
  messages: Array<{ role: string; content: string }>;
  tools?: any[];
  temperature?: number;
  maxTokens?: number;
}

export interface AiChatResult {
  content: string;
  toolCalls?: any[];
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model: string;
}

export interface IAiProvider {
  chat(options: AiChatOptions): Promise<AiChatResult>;
  streamChat(options: AiChatOptions, onChunk: (chunk: string) => void): Promise<AiChatResult>;
  embed(text: string): Promise<number[]>;
}
