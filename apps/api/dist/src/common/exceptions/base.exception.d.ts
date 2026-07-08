import { HttpException, HttpStatus } from '@nestjs/common';
export declare class BaseException extends HttpException {
    readonly message: string;
    readonly code: string;
    constructor(message: string, code: string, status?: HttpStatus);
    getCode(): string;
}
export declare class TenantIsolationException extends BaseException {
    constructor();
}
