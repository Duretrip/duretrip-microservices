import { Role } from '../../roles/entities/role.entity';
import { Status } from 'src/statuses/entities/status.entity';
import { FileEntity } from 'src/files/entities/file.entity';
export declare class CreateUserDto {
    email: string | null;
    password?: string;
    provider?: string;
    socialId?: string | null;
    firstName: string | null;
    lastName: string | null;
    photo?: FileEntity | null;
    role?: Role | null;
    status?: Status;
    hash?: string | null;
}
