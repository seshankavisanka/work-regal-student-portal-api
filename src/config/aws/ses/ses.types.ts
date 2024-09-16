export interface SendEmailI {
  toAddresses: string[];
  htmlData: string;
  subject: string;
  source?: string;
}
