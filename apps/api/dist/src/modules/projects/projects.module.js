"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsModule = void 0;
const common_1 = require("@nestjs/common");
const project_controller_1 = require("./controllers/project.controller");
const task_controller_1 = require("./controllers/task.controller");
const project_service_1 = require("./services/project.service");
const task_service_1 = require("./services/task.service");
const project_repository_1 = require("./repositories/project.repository");
const task_repository_1 = require("./repositories/task.repository");
let ProjectsModule = class ProjectsModule {
};
exports.ProjectsModule = ProjectsModule;
exports.ProjectsModule = ProjectsModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            project_controller_1.ProjectController,
            task_controller_1.TaskController
        ],
        providers: [
            project_service_1.ProjectService,
            task_service_1.TaskService,
            project_repository_1.ProjectRepository,
            task_repository_1.TaskRepository
        ],
        exports: [
            project_service_1.ProjectService,
            task_service_1.TaskService
        ]
    })
], ProjectsModule);
//# sourceMappingURL=projects.module.js.map