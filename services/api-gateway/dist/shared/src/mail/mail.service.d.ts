import { Queue } from 'bull';
import { ForgotPasswordMailInterface, MailJobInterface } from '@dure-trips/shared/interfaces';
export declare class MailService {
    private readonly _mailQueue;
    private readonly _logger;
    constructor(_mailQueue: Queue);
    sendConfirmationEmail(payload: MailJobInterface): Promise<void>;
    forgotPasswordEmail(payload: ForgotPasswordMailInterface): Promise<void>;
}
