import { TaskStatus, TaskPriority, TaskType } from '@prisma/client';
export declare class CreateTaskDto {
    projectId: string;
    code: string;
    title: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    type?: TaskType;
    assigneeId?: string;
    milestoneId?: string;
    sprintId?: string;
    dueDate?: string;
    estimatedHours?: number;
}
export declare class UpdateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    type?: TaskType;
    milestoneId?: string;
    sprintId?: string;
    dueDate?: string;
    estimatedHours?: number;
}
export declare class AssignTaskDto {
    assigneeId: string;
}
export declare class CommentDto {
    content: string;
}
