import { ProjectStatus, ProjectPriority } from '@prisma/client';
export declare class CreateProjectDto {
    name: string;
    code: string;
    description?: string;
    status?: ProjectStatus;
    priority?: ProjectPriority;
    startDate?: string;
    endDate?: string;
    budget?: number;
    customerId?: string;
    memberIds?: string[];
}
export declare class UpdateProjectDto {
    name?: string;
    description?: string;
    status?: ProjectStatus;
    priority?: ProjectPriority;
    startDate?: string;
    endDate?: string;
    budget?: number;
}
