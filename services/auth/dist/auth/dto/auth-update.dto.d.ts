import { FileEntity } from '../../files/entities/file.entity';
export declare class AuthUpdateDto {
    photo?: FileEntity;
    firstName?: string;
    lastName?: string;
    password?: string;
    oldPassword: string;
}
