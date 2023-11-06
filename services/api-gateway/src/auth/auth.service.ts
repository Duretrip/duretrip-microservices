import { TokenInjections, EventPatterns } from '@dure-trips/shared/constants';
import { CreateUserDto, ExistingUserDTO } from '@dure-trips/shared/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ForgetPasswordDto } from './dtos/forget-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(TokenInjections.AUTH_MICROSERVICE)
    private readonly authClient: ClientProxy,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    return this.authClient.send(EventPatterns.create_user, createUserDto);
  }

  login(existingUserDTO: ExistingUserDTO) {
    return this.authClient.send(EventPatterns.login, existingUserDTO);
  }

  loginCookiies(existingUserDTO: ExistingUserDTO) {
    return this.authClient.send(EventPatterns.login, existingUserDTO);
  }

  getAllUsers() {
    return this.authClient.send(EventPatterns.get_all_users, {});
  }

  getUser(userId: number) {
    return this.authClient.send(EventPatterns.get_user, userId);
  }

  forgotPassword(forgotPasswordDto: ForgetPasswordDto) {
    return this.authClient.send(
      EventPatterns.forgot_password,
      forgotPasswordDto,
    );
  }
}
