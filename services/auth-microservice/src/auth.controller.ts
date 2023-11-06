import {
  Controller,
  Inject,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

import { AuthService } from './auth.service';
import { CreateUserDto, ExistingUserDTO } from '@dure-trips/shared/dto';
import { EventPatterns } from '@dure-trips/shared/constants';
import { RabbitmqService } from '@dure-trips/shared/services';
import { JwtGuard } from './jwt.guard';
import { ForgetPasswordDto } from './dtos/forget-password.dto';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(
    @Inject('AuthService')
    private readonly authService: AuthService,
    @Inject('RabbitmqService')
    private readonly rabbitmqService: RabbitmqService,
  ) {}

  @MessagePattern(EventPatterns.create_user)
  register(
    @Ctx() context: RmqContext,
    @Payload(ValidationPipe) data: CreateUserDto,
  ) {
    this.rabbitmqService.acknowledgeMessage(context);

    return this.authService.register(data);
  }

  @MessagePattern(EventPatterns.login)
  login(
    @Ctx() context: RmqContext,
    @Payload(ValidationPipe) data: ExistingUserDTO,
  ) {
    this.rabbitmqService.acknowledgeMessage(context);

    return this.authService.login(data);
  }

  @MessagePattern(EventPatterns.get_all_users)
  async getUsers(@Ctx() context: RmqContext) {
    this.rabbitmqService.acknowledgeMessage(context);
    return await this.authService.getUsers();
  }

  @MessagePattern(EventPatterns.get_user)
  async getUserById(@Ctx() context: RmqContext, @Payload() userId: number) {
    this.rabbitmqService.acknowledgeMessage(context);
    return await this.authService.getUserById(userId);
  }

  @MessagePattern(EventPatterns.verify_jwt)
  @UseGuards(JwtGuard)
  async verifyJwt(
    @Ctx() context: RmqContext,
    @Payload() payload: { jwt: string },
  ) {
    this.rabbitmqService.acknowledgeMessage(context);

    return this.authService.verifyJwt(payload.jwt);
  }

  @MessagePattern(EventPatterns.decode_jwt)
  async decodeJwt(
    @Ctx() context: RmqContext,
    @Payload() payload: { jwt: string },
  ) {
    this.rabbitmqService.acknowledgeMessage(context);

    return this.authService.getUserFromHeader(payload.jwt);
  }

  @MessagePattern(EventPatterns.forgot_password)
  forgotPassword(
    @Ctx() context: RmqContext,
    @Payload(ValidationPipe) data: ForgetPasswordDto,
  ) {
    this.rabbitmqService.acknowledgeMessage(context);

    return this.authService.forgotPassword(data);
  }
}
