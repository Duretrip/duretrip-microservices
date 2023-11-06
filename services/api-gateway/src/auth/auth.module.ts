import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenInjections } from '@dure-trips/shared/constants';
import { RabbitmqModule } from '@dure-trips/shared/modules/rabbitmq.module';
import { MailModule } from '@dure-trips/shared/mail';

@Module({
  imports: [
    RabbitmqModule.register({
      tokenInjection: TokenInjections.AUTH_MICROSERVICE,
      queue: process.env.RABBITMQ_AUTH_QUEUE,
    }),

    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
