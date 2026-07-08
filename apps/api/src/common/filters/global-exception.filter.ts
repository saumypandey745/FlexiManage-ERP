import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseException } from '../exceptions/base.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let code = 'SYS-500';
    let errors: any[] = [];

    if (exception instanceof BaseException) {
      status = exception.getStatus();
      message = exception.message;
      code = exception.getCode();
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;
      
      message = exceptionResponse.message || exception.message;
      if (Array.isArray(message)) {
        errors = message.map(msg => ({ message: msg }));
        message = 'Validation Failed';
        code = 'VAL-422';
        status = HttpStatus.UNPROCESSABLE_ENTITY;
      } else {
        code = `HTTP-${status}`;
      }
    } else {
      this.logger.error(`Unhandled Exception: ${exception}`, (exception as Error)?.stack);
    }

    const traceId = request.headers['x-trace-id'] || 'N/A';

    // RFC 7807 inspired format
    response.status(status).json({
      success: false,
      message,
      code,
      errors: errors.length ? errors : undefined,
      traceId,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
