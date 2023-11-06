/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { CONFIRM_REGISTRATION, FORGOT_PASSWORD, MAIL_QUEUE } from '@dure-trips/shared/constants';
import { ForgotPasswordMailInterface, MailJobInterface } from '@dure-trips/shared/interfaces';

@Injectable()
@Processor(MAIL_QUEUE)
export class MailProcessor {
  private readonly _logger = new Logger(MailProcessor.name);

  constructor(
    private readonly _mailerService: MailerService,
    private readonly _configService: ConfigService,
  ) {}

  @OnQueueActive()
  public onActive(job: Job,) {
    this._logger.debug(`Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(
        job.data,
    )}`);
    
  }

  @OnQueueCompleted()
  public onComplete(job: Job, result: any) {
    this._logger.debug(
      `Completed job ${job.id} of type ${job.name}.  Result: ${JSON.stringify(
        result,
      )}`,
    );
  }

  @OnQueueFailed()
  public onError(job: Job<any>, error: any) {
    this._logger.error(
      `Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  @Process(CONFIRM_REGISTRATION)
  public async confirmRegistration(job: Job<MailJobInterface>) {
    this._logger.log(
      `Sending confirm registration email to '${job.data.emailAddress}'`,
    );

    try {
      return this._mailerService.sendMail({
        to: job.data.emailAddress,
        from: this._configService.get('MAIL_FROM'),
        subject: 'Registration',
        template: './registration.hbs',
        context: { confirmUrl: job.data.confirmUrl },
      });
    } catch (error) {
      this._logger.error(
        `Failed to send email to '${job.data.emailAddress}'`,
        error.stack,
      );
      throw error;
    }
  }
    @Process(FORGOT_PASSWORD)
    public async forgotPassword(job: Job<ForgotPasswordMailInterface>) {
    this._logger.log(
      `Sending reset password email to '${job.data.email}'`,
    );

    try {
      return this._mailerService.sendMail({
        to: job.data.email,
        from: this._configService.get('MAIL_FROM'),
          subject: job.data.subject,
        template: './reset-password.hbs',
          context: {
              name: job.data.name,
              subject: job.data.subject.toLowerCase(),
              url: job.data.url,
          },
      });
    } catch (error) {
      this._logger.error(
        `Failed to send email to '${job.data.email}'`,
        error.stack,
      );
      throw error;
    }
  }
}
