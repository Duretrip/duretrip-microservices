import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
export declare class JwtAuthGuard implements CanActivate {
    private authClient;
    constructor(authClient: ClientProxy);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    private getAuthentication;
    private addUser;
}
