import { Role } from '../enum/user.ennum';
export declare const ROLE_KEY = "role";
export declare const Roles: (...role: Role[]) => import("@nestjs/common").CustomDecorator<string>;
