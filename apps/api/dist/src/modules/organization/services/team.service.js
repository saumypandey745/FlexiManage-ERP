"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamService = void 0;
const common_1 = require("@nestjs/common");
const organization_repository_1 = require("../organization.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let TeamService = class TeamService {
    constructor(repo, prisma) {
        this.repo = repo;
        this.prisma = prisma;
    }
    async getTeams(tenantId) {
        return this.repo.findTeams(tenantId);
    }
    async createTeam(tenantId, userId, dto) {
        const team = await this.repo.createTeam(tenantId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'CREATE',
                entityName: 'Team',
                entityId: team.id,
                newValues: dto,
            },
        });
        return team;
    }
    async updateTeam(tenantId, teamId, userId, dto) {
        const team = await this.repo.updateTeam(tenantId, teamId, dto);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'UPDATE',
                entityName: 'Team',
                entityId: team.id,
                newValues: dto,
            },
        });
        return team;
    }
    async deleteTeam(tenantId, teamId, userId) {
        const team = await this.repo.deleteTeam(tenantId, teamId);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'DELETE',
                entityName: 'Team',
                entityId: team.id,
            },
        });
        return team;
    }
};
exports.TeamService = TeamService;
exports.TeamService = TeamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [organization_repository_1.OrganizationRepository,
        prisma_service_1.PrismaService])
], TeamService);
//# sourceMappingURL=team.service.js.map