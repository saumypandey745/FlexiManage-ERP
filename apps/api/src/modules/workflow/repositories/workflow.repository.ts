// @ts-nocheck
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../common/prisma/prisma.service";
import {
  CreateWorkflowDto,
  UpdateWorkflowDto,
  CreateWorkflowNodeDto,
  CreateWorkflowEdgeDto,
} from "../dto/workflow.dto";
import { Workflow, WorkflowNode, WorkflowEdge } from "@prisma/client";

@Injectable()
export class WorkflowRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: CreateWorkflowDto): Promise<Workflow> {
    return this.prisma.workflow.create({
      data: {
        tenantId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
      },
    });
  }

  async findMany(
    tenantId: string,
    skip = 0,
    take = 20
  ): Promise<[Workflow[], number]> {
    return Promise.all([
      this.prisma.workflow.findMany({
        where: { tenantId, deletedAt: null },
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      this.prisma.workflow.count({
        where: { tenantId, deletedAt: null },
      }),
    ]);
  }

  async findById(tenantId: string, id: string) {
    return this.prisma.workflow.findUnique({
      where: { id, tenantId },
      include: {
        nodes: true,
        edges: true,
      },
    });
  }

  async update(
    tenantId: string,
    id: string,
    dto: UpdateWorkflowDto,
    currentVersion: number
  ): Promise<Workflow> {
    return this.prisma.workflow.update({
      where: { id, tenantId, version: currentVersion },
      data: {
        ...dto,
        version: { increment: 1 },
      },
    });
  }

  async addNode(
    tenantId: string,
    workflowId: string,
    dto: CreateWorkflowNodeDto
  ): Promise<WorkflowNode> {
    return this.prisma.workflowNode.create({
      data: {
        tenantId,
        workflowId,
        type: dto.type,
        name: dto.name,
        config: dto.config || {},
        positionX: dto.positionX || 0,
        positionY: dto.positionY || 0,
      },
    });
  }

  async addEdge(
    tenantId: string,
    workflowId: string,
    dto: CreateWorkflowEdgeDto
  ): Promise<WorkflowEdge> {
    return this.prisma.workflowEdge.create({
      data: {
        tenantId,
        workflowId,
        sourceId: dto.sourceId,
        targetId: dto.targetId,
        condition: dto.condition,
      },
    });
  }

  async softDelete(tenantId: string, id: string) {
    return this.prisma.workflow.update({
      where: { id, tenantId },
      data: { deletedAt: new Date(), status: "ARCHIVED" },
    });
  }
}
