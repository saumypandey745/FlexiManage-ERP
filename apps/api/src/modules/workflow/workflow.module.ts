import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { WorkflowController } from "./controllers/workflow.controller";
import { WorkflowExecutionController } from "./controllers/workflow-execution.controller";
import { WorkflowService } from "./services/workflow.service";
import { WorkflowEngineService } from "./services/workflow-engine.service";
import { WorkflowRepository } from "./repositories/workflow.repository";
import { WorkflowExecutionRepository } from "./repositories/workflow-execution.repository";
import { WorkflowProcessor } from "./processors/workflow.processor";

import { EmailModule } from "../email/email.module";
import { AiModule } from "../ai/ai.module";
import { IntegrationsModule } from "../integrations/integrations.module";

@Module({
  imports: [
    EmailModule,
    AiModule,
    IntegrationsModule,
    BullModule.registerQueue({
      name: "workflow-queue",
    }),
  ],
  controllers: [WorkflowController, WorkflowExecutionController],
  providers: [
    WorkflowService,
    WorkflowEngineService,
    WorkflowRepository,
    WorkflowExecutionRepository,
    WorkflowProcessor,
  ],
  exports: [WorkflowService, WorkflowEngineService],
})
export class WorkflowModule {}
