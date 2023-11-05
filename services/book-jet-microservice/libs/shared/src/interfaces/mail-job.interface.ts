export interface MailJobInterface {
  // to: string;
  // slug: string;
  // subject: string;
  // context: any;
  // attachments?: any;
  emailAddress: string;
  confirmUrl: string;
}
export interface ForgotPasswordMailInterface {
  email: string;
  url: string;
  subject: string;
  name: string;
}
