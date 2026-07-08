import { SprintStatus } from '@prisma/client';
export declare class SprintDto {
    projectId: string;
    name: string;
    goal?: string;
    startDate: string;
    endDate: string;
    status?: SprintStatus;
}
export declare class MilestoneDto {
    projectId: string;
    name: string;
    description?: string;
    dueDate: string;
}
export declare class TimeEntryDto {
    taskId?: string;
    date: string;
    hours: number;
    description?: string;
}
