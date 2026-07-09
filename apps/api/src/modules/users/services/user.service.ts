import { Injectable } from "@nestjs/common";
import { UserRepository } from "../user.repository";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { UserStatus } from "@prisma/client";
import { PrismaService } from "../../../common/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(
    private readonly repo: UserRepository,
    private readonly prisma: PrismaService
  ) {}

  async getUsers(tenantId: string) {
    return this.repo.findUsers(tenantId);
  }

  async getUserById(tenantId: string, id: string) {
    return this.repo.findById(tenantId, id);
  }

  async createUser(tenantId: string, actionUserId: string, dto: CreateUserDto) {
    const user = await this.repo.createUser(tenantId, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: "CREATE",
        entityName: "User",
        entityId: user.id,
        newValues: { email: dto.email, status: dto.status } as any,
      },
    });

    return user;
  }

  async updateUser(
    tenantId: string,
    id: string,
    actionUserId: string,
    dto: UpdateUserDto
  ) {
    const user = await this.repo.updateUser(tenantId, id, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: "UPDATE",
        entityName: "User",
        entityId: user.id,
        newValues: dto as any,
      },
    });

    return user;
  }

  async deleteUser(tenantId: string, id: string, actionUserId: string) {
    const user = await this.repo.deleteUser(tenantId, id);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: "DELETE",
        entityName: "User",
        entityId: user.id,
      },
    });

    return user;
  }

  async changeStatus(
    tenantId: string,
    id: string,
    actionUserId: string,
    status: UserStatus
  ) {
    const user = await this.repo.updateStatus(tenantId, id, status);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: "UPDATE",
        entityName: "UserStatus",
        entityId: user.id,
        newValues: { status } as any,
      },
    });

    return user;
  }
}
