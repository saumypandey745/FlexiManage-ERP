"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowModule = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const workflow_controller_1 = require("./controllers/workflow.controller");
const workflow_execution_controller_1 = require("./controllers/workflow-execution.controller");
const workflow_service_1 = require("./services/workflow.service");
const workflow_engine_service_1 = require("./services/workflow-engine.service");
const workflow_repository_1 = require("./repositories/workflow.repository");
const workflow_execution_repository_1 = require("./repositories/workflow-execution.repository");
const workflow_processor_1 = require("./processors/workflow.processor");
let WorkflowModule = class WorkflowModule {
};
exports.WorkflowModule = WorkflowModule;
exports.WorkflowModule = WorkflowModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bullmq_1.BullModule.registerQueue({
                name: 'workflow-queue',
            }),
        ],
        controllers: [
            workflow_controller_1.WorkflowController,
            workflow_execution_controller_1.WorkflowExecutionController
        ],
        providers: [
            workflow_service_1.WorkflowService,
            workflow_engine_service_1.WorkflowEngineService,
            workflow_repository_1.WorkflowRepository,
            workflow_execution_repository_1.WorkflowExecutionRepository,
            workflow_processor_1.WorkflowProcessor
        ],
        exports: [workflow_service_1.WorkflowService, workflow_engine_service_1.WorkflowEngineService]
    })
], WorkflowModule);
//# sourceMappingURL=workflow.module.js.map