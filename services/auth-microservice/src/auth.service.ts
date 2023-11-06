import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, ExistingUserDTO } from '@dure-trips/shared/dto';
import { UserEntity } from '@dure-trips/shared/entities';
import { JwtService } from '@nestjs/jwt';
import { UserJwt } from '@dure-trips/shared/interfaces';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@dure-trips/shared/exceptions/conflict.exception';
import { CustomPrismaService } from 'nestjs-prisma';
import { PrismaClient as AuthPrismaClient } from '@dare/auth/client';
import { Utils } from '@dure-trips/shared/helpers';
import { ForgetPasswordDto } from './dtos/forget-password.dto';
import { MailService } from '@dure-trips/shared/mail';
import { MessagePattern } from '@nestjs/microservices';
import { CurrentUser } from './decorators/current-user.decorator';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthPrismaClient')
    private authPrismaClient: CustomPrismaService<AuthPrismaClient>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    const users = await this.authPrismaClient.client.user.findMany();
    return users.map((user: UserEntity) => Utils.exclude(user, ['password']));
  }

  async getUserById(id: number): Promise<UserEntity> {
    const user = await this.authPrismaClient.client.user.findUnique({
      where: { id },
    });

    return Utils.exclude(user, ['password']);
  }

  async findByEmail(email: string): Promise<Partial<UserEntity>> {
    return await this.authPrismaClient.client.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(newUser: Readonly<CreateUserDto>): Promise<UserEntity> {
    const { firstName, lastName, email, password } = newUser;

    try {
      const existingUser = await this.findByEmail(email);

      if (existingUser) {
        throw new ConflictException(
          'An account with that email already exists!',
        );
      }

      const hashedPassword = await this.hashPassword(password);

      const savedUser = await this.authPrismaClient.client.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      });

      delete savedUser.password;

      // // send confirmation mail
      // const confirmUrl = 'https://link.test?ey=testexample2';
      // await this.mailService.sendConfirmationEmail({
      //   emailAddress: savedUser.email,
      //   confirmUrl: confirmUrl,
      // });
      return savedUser;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<UserEntity>> {
    const user = await this.findByEmail(email);
    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Step 2: Check if the password is correct
    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );

    // If password does not match, throw an error
    if (!doesPasswordMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

  async login(existingUser: Readonly<ExistingUserDTO>) {
    const { email, password } = existingUser;
    try {
      const user = await this.validateUser(email, password);

      delete user.password;

      const jwt = await this.jwtService.signAsync({ user });

      return { token: jwt, user };
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateCurrentUser(@CurrentUser() user: UserEntity) {
    return user;
  }

  async verifyJwt(jwt: string): Promise<{ user: UserEntity; exp: number }> {
    if (!jwt) {
      throw new UnauthorizedException();
    }

    try {
      const { user, exp } = await this.jwtService.verifyAsync(jwt);
      return { user, exp };
    } catch (error) {
      console.log(error);

      throw new UnauthorizedException();
    }
  }

  async getUserFromHeader(jwt: string): Promise<UserJwt> {
    if (!jwt) return;

    try {
      return this.jwtService.decode(jwt) as UserJwt;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  /**
   * forget password and send reset code by email
   * @param forgetPasswordDto
   */
  async forgotPassword(forgetPasswordDto: ForgetPasswordDto): Promise<void> {
    const { email } = forgetPasswordDto;
    const user = await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const token = `${Utils.randomAlpha()}${Utils.randomAlpha()}`;

    const currentDateTime = new Date();
    currentDateTime.setHours(currentDateTime.getHours() + 1);
    const updateUser = await this.authPrismaClient.client.user.update({
      where: { email },
      data: { token, tokenValidityDate: currentDateTime },
    });

    // // send reset Password mail
    const link = 'https://link.test?ey=testexample2';
    const payload = {
      subject: 'Reset Password',
      name: `${updateUser.firstName} ${updateUser.lastName}`,
      email: updateUser.email,
      url: link,
    };
    // Send Mail
    await this.mailService.forgotPasswordEmail(payload);
  }
}
