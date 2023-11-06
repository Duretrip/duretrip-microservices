import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { EventPatterns, TokenInjections } from '../constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(TokenInjections.AUTH_MICROSERVICE)
    private readonly authClient: ClientProxy,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'http') {
      return false;
    }

    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];

    if (!authHeader) return false;

    const authHeaderParts = (authHeader as string).split(' ');

    if (authHeaderParts.length !== 2) return false;

    const [, jwt] = authHeaderParts;

    return this.authClient.send(EventPatterns.verify_jwt, { jwt }).pipe(
      switchMap(({ exp }) => {
        if (!exp) return of(false);

        const TOKEN_EXP_MS = exp * 1000;

        const isJwtValid = Date.now() < TOKEN_EXP_MS;
        return of(isJwtValid);
      }),
      catchError((error) => {
        console.log(error);
        throw new UnauthorizedException(error.message);
      }),
    );
  }
}
