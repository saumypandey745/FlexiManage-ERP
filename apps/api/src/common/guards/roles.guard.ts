import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, PERMISSIONS_KEY } from '../decorators/auth.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles && !requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    if (!user) {
      throw new ForbiddenException('User context not found');
    }

    let hasRole = true;
    let hasPermission = true;

    if (requiredRoles) {
      hasRole = requiredRoles.some((role) => user.roles?.includes(role));
    }

    if (requiredPermissions) {
      hasPermission = requiredPermissions.some((permission) => user.permissions?.includes(permission));
    }

    if (!hasRole || !hasPermission) {
      throw new ForbiddenException('Insufficient permissions to access this resource');
    }

    return true;
  }
}
