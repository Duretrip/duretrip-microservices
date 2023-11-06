import { User } from '@dare/auth/client';
import { RoleType, UserStatusType } from '../enum/user.ennum';
export declare class UserEntity implements User {
    constructor(data: Partial<UserEntity>);
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token: string;
    tokenValidityDate: Date;
    role: RoleType;
    status: UserStatusType;
    createdAt: Date;
    updatedAt: Date;
}
