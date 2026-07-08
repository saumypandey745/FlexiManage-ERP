import { Module } from '@nestjs/common';
import { ProjectController } from './controllers/project.controller';
import { TaskController } from './controllers/task.controller';
import { ProjectService } from './services/project.service';
import { TaskService } from './services/task.service';
import { ProjectRepository } from './repositories/project.repository';
import { TaskRepository } from './repositories/task.repository';

@Module({
  controllers: [
    ProjectController,
    TaskController
  ],
  providers: [
    ProjectService,
    TaskService,
    ProjectRepository,
    TaskRepository
  ],
  exports: [
    ProjectService,
    TaskService
  ]
})
export class ProjectsModule {}
