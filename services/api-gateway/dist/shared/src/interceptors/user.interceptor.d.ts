import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
export declare class UserInterceptor implements NestInterceptor {
    private readonly authClient;
    constructor(authClient: ClientProxy);
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<any>;
}
