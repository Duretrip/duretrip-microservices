import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './jwt.guard';
import { JwtStrategy } from './jwt-strategy';
import { RabbitmqModule } from '@dure-trips/shared/modules';
import { RabbitmqService } from '@dure-trips/shared/services';
import { CustomPrismaModule } from 'nestjs-prisma';
import { PrismaClient as AuthPrismaClient } from '@dare/auth/client';
import { MailModule } from '@dure-trips/shared/mail';

@Module({
  imports: [
    MailModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),
    RabbitmqModule,
    CustomPrismaModule.forRoot({
      name: 'AuthPrismaClient',
      client: new AuthPrismaClient(),
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtGuard,
    JwtStrategy,
    {
      provide: 'AuthService',
      useClass: AuthService,
    },
    {
      provide: 'RabbitmqService',
      useClass: RabbitmqService,
    },
  ],
})
export class AuthModule {}
