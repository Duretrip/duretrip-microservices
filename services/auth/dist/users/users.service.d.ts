import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { NullableType } from '../utils/types/nullable.type';
import { FilterUserDto, SortUserDto } from './dto/query-user.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createProfileDto: CreateUserDto): Promise<User>;
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: FilterUserDto | null;
        sortOptions?: SortUserDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<User[]>;
    findOne(fields: EntityCondition<User>): Promise<NullableType<User>>;
    update(id: User['id'], payload: DeepPartial<User>): Promise<User>;
    softDelete(id: User['id']): Promise<void>;
}
