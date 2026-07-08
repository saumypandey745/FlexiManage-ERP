import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuditInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const method = request.method;
    const isMutating = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);

    if (!isMutating) {
      return next.handle();
    }

    const userId = (request['user'] as any)?.id || 'SYSTEM';
    const tenantId = (request['user'] as any)?.tenantId || 'GLOBAL';
    const traceId = (request.headers['x-trace-id'] as string) || 'N/A';
    const url = request.url;

    return next.handle().pipe(
      tap(() => {
        // In a real implementation, you would inject an AuditService here 
        // and asynchronously write to the AuditLog database table.
        const statusCode = response.statusCode;
        this.logger.log(`[AUDIT] User:${userId} | Tenant:${tenantId} | Action:${method} ${url} | Status:${statusCode} | TraceId:${traceId}`);
      }),
    );
  }
}
