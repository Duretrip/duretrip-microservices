import { Role } from '../../roles/entities/role.entity';
import { User } from '../entities/user.entity';
export declare class FilterUserDto {
    roles?: Role[] | null;
}
export declare class SortUserDto {
    orderBy: keyof User;
    order: string;
}
export declare class QueryUserDto {
    page: number;
    limit: number;
    filters?: FilterUserDto | null;
    sort?: SortUserDto[] | null;
}
