import { OrganizationRepository } from '../organization.repository';
import { CreateTeamDto, UpdateTeamDto } from '../dto/team.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class TeamService {
    private readonly repo;
    private readonly prisma;
    constructor(repo: OrganizationRepository, prisma: PrismaService);
    getTeams(tenantId: string): Promise<{
        code: string;
        description: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        version: number;
        departmentId: string | null;
    }[]>;
    createTeam(tenantId: string, userId: string, dto: CreateTeamDto): Promise<{
        code: string;
        description: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        version: number;
        departmentId: string | null;
    }>;
    updateTeam(tenantId: string, teamId: string, userId: string, dto: UpdateTeamDto): Promise<{
        code: string;
        description: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        version: number;
        departmentId: string | null;
    }>;
    deleteTeam(tenantId: string, teamId: string, userId: string): Promise<{
        code: string;
        description: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        version: number;
        departmentId: string | null;
    }>;
}
