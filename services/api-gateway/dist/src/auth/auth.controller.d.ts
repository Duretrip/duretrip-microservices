import { AuthService } from './auth.service';
import { CreateUserDto, ExistingUserDTO } from '@dure-trips/shared/dto';
import { ForgetPasswordDto } from 'apps/auth-microservice/src/dtos/forget-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    createUser(createUserDto: CreateUserDto): any;
    login(existingUserDTO: ExistingUserDTO): Promise<any>;
    getAllUsers(): any;
    findOne(id: number): Promise<any>;
    forgotPassword(forgetPasswordDto: ForgetPasswordDto): any;
}
