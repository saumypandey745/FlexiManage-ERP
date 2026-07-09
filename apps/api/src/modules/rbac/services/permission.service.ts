import { Injectable } from "@nestjs/common";
import { RbacRepository } from "../rbac.repository";
import {
  CreatePermissionDto,
  UpdatePermissionDto,
} from "../dto/permission.dto";

@Injectable()
export class PermissionService {
  constructor(private readonly repo: RbacRepository) {}

  async getPermissions() {
    return this.repo.getPermissions();
  }

  async createPermission(dto: CreatePermissionDto) {
    return this.repo.createPermission(dto);
  }

  async updatePermission(permissionId: string, dto: UpdatePermissionDto) {
    return this.repo.updatePermission(permissionId, dto);
  }

  async deletePermission(permissionId: string) {
    return this.repo.deletePermission(permissionId);
  }
}
