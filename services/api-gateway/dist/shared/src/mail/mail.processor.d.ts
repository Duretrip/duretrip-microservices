import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { ForgotPasswordMailInterface, MailJobInterface } from '@dure-trips/shared/interfaces';
export declare class MailProcessor {
    private readonly _mailerService;
    private readonly _configService;
    private readonly _logger;
    constructor(_mailerService: MailerService, _configService: ConfigService);
    onActive(job: Job): void;
    onComplete(job: Job, result: any): void;
    onError(job: Job<any>, error: any): void;
    confirmRegistration(job: Job<MailJobInterface>): Promise<any>;
    forgotPassword(job: Job<ForgotPasswordMailInterface>): Promise<any>;
}
