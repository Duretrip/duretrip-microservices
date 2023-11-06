import { AuthService } from './auth.service';
import { CreateUserDto, ExistingUserDTO } from '@dure-trips/shared/dto';
import { ForgetPasswordDto } from './dtos/forget-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    createUser(createUserDto: CreateUserDto): import("rxjs").Observable<any>;
    login(existingUserDTO: ExistingUserDTO): Promise<import("rxjs").Observable<any>>;
    getAllUsers(): import("rxjs").Observable<any>;
    findOne(id: number): Promise<import("rxjs").Observable<any>>;
    forgotPassword(forgetPasswordDto: ForgetPasswordDto): import("rxjs").Observable<any>;
}
