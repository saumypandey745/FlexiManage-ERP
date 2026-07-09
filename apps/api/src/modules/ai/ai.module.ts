import { Module } from "@nestjs/common";
import { AiController } from "./controllers/ai.controller";
import { AiService } from "./services/ai.service";
import { AiGatewayService } from "./providers/ai-gateway.service";
import { OpenAiProvider } from "./providers/openai.provider";
import { AiConversationRepository } from "./repositories/ai-conversation.repository";
import { AiPromptRepository } from "./repositories/ai-prompt.repository";
import { AiUsageRepository } from "./repositories/ai-usage.repository";
import { AiVectorRepository } from "./repositories/ai-vector.repository";

@Module({
  controllers: [AiController],
  providers: [
    AiService,
    AiGatewayService,
    OpenAiProvider,
    AiConversationRepository,
    AiPromptRepository,
    AiUsageRepository,
    AiVectorRepository,
  ],
  exports: [AiService, AiGatewayService],
})
export class AiModule {}
