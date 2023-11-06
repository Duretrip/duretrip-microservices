import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import {
  CONFIRM_REGISTRATION,
  FORGOT_PASSWORD,
  MAIL_QUEUE,
} from '@dure-trips/shared/constants';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import {
  ForgotPasswordMailInterface,
  MailJobInterface,
} from '@dure-trips/shared/interfaces';

@Injectable()
export class MailService {
  private readonly _logger = new Logger(MailService.name);
  constructor(@InjectQueue(MAIL_QUEUE) private readonly _mailQueue: Queue) {}

  public async sendConfirmationEmail(payload: MailJobInterface): Promise<void> {
    try {
      //Add Job to Queue
      await this._mailQueue.add(CONFIRM_REGISTRATION, payload, {
        // attempts: 0,
        // timeout: 5,
        removeOnComplete: true,
      });
    } catch (error) {
      this._logger.error(
        `Error queueing registration email to user ${payload.emailAddress}`,
      );

      throw error;
    }
  }

  public async forgotPasswordEmail(
    payload: ForgotPasswordMailInterface,
  ): Promise<void> {
    try {
      //Add Job to Queue
      await this._mailQueue.add(FORGOT_PASSWORD, payload, {
        // attempts: 0,
        // timeout: 5,
        removeOnComplete: true,
      });
    } catch (error) {
      this._logger.error(
        `Error queueing registration email to user ${payload.email}`,
      );

      throw error;
    }
  }
}
