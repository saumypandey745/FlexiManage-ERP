export declare enum AiProviderCode {
    OPENAI = "OPENAI",
    ANTHROPIC = "ANTHROPIC",
    GEMINI = "GEMINI",
    AZURE = "AZURE",
    OLLAMA = "OLLAMA",
    OPENROUTER = "OPENROUTER",
    DEEPSEEK = "DEEPSEEK"
}
export declare enum AiConversationStatus {
    ACTIVE = "ACTIVE",
    ARCHIVED = "ARCHIVED"
}
export declare class ChatRequestDto {
    conversationId?: string;
    message: string;
    templateCode?: string;
    context?: Record<string, any>;
    stream?: boolean;
}
export declare class CreateTemplateDto {
    code: string;
    name: string;
    description?: string;
    systemPrompt: string;
    userPrompt?: string;
}
export declare class SemanticSearchDto {
    query: string;
    sourceType?: string;
}
export declare class EmbedDocumentDto {
    title: string;
    content: string;
    sourceType: string;
    sourceId?: string;
    metadata?: Record<string, any>;
}
export declare class GenerateRequestDto {
    prompt: string;
    taskType?: string;
}
