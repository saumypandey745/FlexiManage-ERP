import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Request } from "express";

export interface Response<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: any;
  traceId?: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const traceId =
      (request.headers["x-trace-id"] as string) || "req_" + Date.now();

    return next.handle().pipe(
      map((data) => {
        // If data is already formatted correctly, just return it
        if (
          data &&
          typeof data === "object" &&
          "success" in data &&
          "data" in data
        ) {
          return { ...data, traceId } as Response<T>;
        }

        // Standardize raw data returns
        return {
          success: true,
          message: "Success",
          data,
          traceId,
        };
      })
    );
  }
}
