import { Injectable } from "@nestjs/common";
import { OrganizationRepository } from "../organization.repository";
import { CreateTeamDto, UpdateTeamDto } from "../dto/team.dto";
import { PrismaService } from "../../../common/prisma/prisma.service";

@Injectable()
export class TeamService {
  constructor(
    private readonly repo: OrganizationRepository,
    private readonly prisma: PrismaService
  ) {}

  async getTeams(tenantId: string) {
    return this.repo.findTeams(tenantId);
  }

  async createTeam(tenantId: string, userId: string, dto: CreateTeamDto) {
    const team = await this.repo.createTeam(tenantId, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: "CREATE",
        entityName: "Team",
        entityId: team.id,
        newValues: dto as any,
      },
    });

    return team;
  }

  async updateTeam(
    tenantId: string,
    teamId: string,
    userId: string,
    dto: UpdateTeamDto
  ) {
    const team = await this.repo.updateTeam(tenantId, teamId, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: "UPDATE",
        entityName: "Team",
        entityId: team.id,
        newValues: dto as any,
      },
    });

    return team;
  }

  async deleteTeam(tenantId: string, teamId: string, userId: string) {
    const team = await this.repo.deleteTeam(tenantId, teamId);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: "DELETE",
        entityName: "Team",
        entityId: team.id,
      },
    });

    return team;
  }
}
