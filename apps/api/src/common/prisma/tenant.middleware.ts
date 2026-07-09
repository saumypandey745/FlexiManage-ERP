import { Injectable, NestMiddleware, ForbiddenException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // In a fully developed app, the JWT guard runs after middleware.
    // If we need tenantId for Prisma Client Extensions before the request hits the controller,
    // we extract it here from the JWT manually, or rely on AsyncLocalStorage (ALS).

    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      try {
        // Minimal extraction, assuming standard JWT structure.
        // DO NOT verify here; let the AuthGuard handle verification.
        const base64Url = token.split(".")[1];
        if (base64Url) {
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );
          const payload = JSON.parse(jsonPayload);

          if (payload.tenantId) {
            req["tenantId"] = payload.tenantId;
          }
        }
      } catch (e) {
        // Ignore parsing errors here; AuthGuard will reject invalid tokens.
      }
    }

    next();
  }
}
