import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(
    public readonly message: string,
    public readonly code: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(message, status);
  }

  getCode(): string {
    return this.code;
  }
}

export class TenantIsolationException extends BaseException {
  constructor() {
    super('Tenant isolation violation detected.', 'SEC-403', HttpStatus.FORBIDDEN);
  }
}
