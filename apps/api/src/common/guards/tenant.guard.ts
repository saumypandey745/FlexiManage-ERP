import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request["user"];

    if (!user || !(user as any).tenantId) {
      throw new ForbiddenException("No active tenant context found for user");
    }

    // You could also validate if the URL param tenantId matches the user.tenantId
    // if the architecture requires tenantId in the path (e.g. /api/v1/:tenantId/...).
    // For implicit tenant architecture (where token dictates tenant), just checking existence is fine.

    return true;
  }
}
