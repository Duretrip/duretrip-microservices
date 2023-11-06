export interface MailJobInterface {
    emailAddress: string;
    confirmUrl: string;
}
export interface ForgotPasswordMailInterface {
    email: string;
    url: string;
    subject: string;
    name: string;
}
