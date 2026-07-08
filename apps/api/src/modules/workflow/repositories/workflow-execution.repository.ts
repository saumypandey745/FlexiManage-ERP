import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { WorkflowExecution, WorkflowLog } from '@prisma/client';

@Injectable()
export class WorkflowExecutionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createExecution(tenantId: string, workflowId: string, triggerData?: any): Promise<WorkflowExecution> {
    return this.prisma.workflowExecution.create({
      data: {
        tenantId,
        workflowId,
        status: 'PENDING',
        triggerData: triggerData || {},
      }
    });
  }

  async getExecution(tenantId: string, id: string): Promise<WorkflowExecution | null> {
    return this.prisma.workflowExecution.findUnique({
      where: { id, tenantId },
      include: {
        variables: true,
        logs: {
          orderBy: { createdAt: 'desc' },
          take: 50
        }
      }
    });
  }

  async updateStatus(tenantId: string, id: string, status: string, completedAt?: Date) {
    return this.prisma.workflowExecution.update({
      where: { id, tenantId },
      data: { status, completedAt, startedAt: status === 'RUNNING' ? new Date() : undefined }
    });
  }

  async setVariable(tenantId: string, executionId: string, key: string, value: any) {
    return this.prisma.workflowVariable.upsert({
      where: {
        executionId_key: { executionId, key }
      },
      update: { value },
      create: {
        tenantId,
        executionId,
        key,
        value
      }
    });
  }

  async addLog(tenantId: string, executionId: string, level: string, message: string, nodeId?: string, details?: any): Promise<WorkflowLog> {
    return this.prisma.workflowLog.create({
      data: {
        tenantId,
        executionId,
        nodeId,
        level,
        message,
        details: details || {}
      }
    });
  }
}
