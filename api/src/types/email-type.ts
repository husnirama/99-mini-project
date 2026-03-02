export interface SendEmailParams {
  to: string;
  subject: string;
  emailData: Record<string, any>;
  emailTemplate: string;
}
