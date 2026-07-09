import { Injectable } from "@nestjs/common";
import { OrganizationRepository } from "../organization.repository";
import {
  CreateDepartmentDto,
  UpdateDepartmentDto,
} from "../dto/department.dto";
import { PrismaService } from "../../../common/prisma/prisma.service";

@Injectable()
export class DepartmentService {
  constructor(
    private readonly repo: OrganizationRepository,
    private readonly prisma: PrismaService
  ) {}

  async getDepartments(tenantId: string) {
    return this.repo.findDepartments(tenantId);
  }

  async createDepartment(
    tenantId: string,
    userId: string,
    dto: CreateDepartmentDto
  ) {
    const department = await this.repo.createDepartment(tenantId, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: "CREATE",
        entityName: "Department",
        entityId: department.id,
        newValues: dto as any,
      },
    });

    return department;
  }

  async updateDepartment(
    tenantId: string,
    departmentId: string,
    userId: string,
    dto: UpdateDepartmentDto
  ) {
    const department = await this.repo.updateDepartment(
      tenantId,
      departmentId,
      dto
    );

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: "UPDATE",
        entityName: "Department",
        entityId: department.id,
        newValues: dto as any,
      },
    });

    return department;
  }

  async deleteDepartment(
    tenantId: string,
    departmentId: string,
    userId: string
  ) {
    const department = await this.repo.deleteDepartment(tenantId, departmentId);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: "DELETE",
        entityName: "Department",
        entityId: department.id,
      },
    });

    return department;
  }
}
