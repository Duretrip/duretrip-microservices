import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { MAIL_QUEUE } from 'libs/shared/src/constants';
import { RabbitmqModule } from 'libs/shared/src/modules';
import { MailService } from './mail.service';
import { MailProcessor } from './mail.processor';

@Module({
  imports: [
    RabbitmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    BullModule.registerQueueAsync({
      name: MAIL_QUEUE,
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD'),
          retryStrategy(times) {
            return Math.min(times * 50, 2000);
          },
        },
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: +configService.get('MAIL_PORT'),
          secure: false,
          // secure: configService.get('MAIL_SECURE'),
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASSWORD'),
          },
          tls: { rejectUnauthorized: false },
        },
        defaults: {
          from: `<${process.env.MAIL_FROM}>`,
        }, // the header of the received emails is defined here.
        // preview: true, //TODO Remove
        template: {
          dir: __dirname + '/templates', // here you must specify the path where the directory with all email templates is located
          adapter: new HandlebarsAdapter(),
          options: { strict: true },
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: MAIL_QUEUE,
    }),
  ],

  providers: [MailService, MailProcessor],
  exports: [MailService],
})
export class MailModule {}
