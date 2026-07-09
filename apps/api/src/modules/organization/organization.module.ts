import { Module } from "@nestjs/common";
import { OrganizationController } from "./organization.controller";
import { OrganizationRepository } from "./organization.repository";
import { BranchService } from "./services/branch.service";
import { DepartmentService } from "./services/department.service";
import { TeamService } from "./services/team.service";
import { SettingsService } from "./services/settings.service";

@Module({
  controllers: [OrganizationController],
  providers: [
    OrganizationRepository,
    BranchService,
    DepartmentService,
    TeamService,
    SettingsService,
  ],
  exports: [BranchService, DepartmentService, TeamService, SettingsService],
})
export class OrganizationModule {}
