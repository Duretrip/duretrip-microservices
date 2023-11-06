import { CreateUserDto, ExistingUserDTO } from '@dure-trips/shared/dto';
import { ClientProxy } from '@nestjs/microservices';
import { ForgetPasswordDto } from 'apps/auth-microservice/src/dtos/forget-password.dto';
export declare class AuthService {
    private readonly authClient;
    constructor(authClient: ClientProxy);
    createUser(createUserDto: CreateUserDto): any;
    login(existingUserDTO: ExistingUserDTO): any;
    loginCookiies(existingUserDTO: ExistingUserDTO): any;
    getAllUsers(): any;
    getUser(userId: number): any;
    forgotPassword(forgotPasswordDto: ForgetPasswordDto): any;
}
