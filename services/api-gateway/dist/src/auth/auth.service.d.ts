import { CreateUserDto, ExistingUserDTO } from '@dure-trips/shared/dto';
import { ClientProxy } from '@nestjs/microservices';
import { ForgetPasswordDto } from './dtos/forget-password.dto';
export declare class AuthService {
    private readonly authClient;
    constructor(authClient: ClientProxy);
    createUser(createUserDto: CreateUserDto): import("rxjs").Observable<any>;
    login(existingUserDTO: ExistingUserDTO): import("rxjs").Observable<any>;
    loginCookiies(existingUserDTO: ExistingUserDTO): import("rxjs").Observable<any>;
    getAllUsers(): import("rxjs").Observable<any>;
    getUser(userId: number): import("rxjs").Observable<any>;
    forgotPassword(forgotPasswordDto: ForgetPasswordDto): import("rxjs").Observable<any>;
}
