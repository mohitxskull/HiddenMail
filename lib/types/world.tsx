export interface MailListObjectType {
  id: number;
  from: string;
  subject: string;
  date: string;
}

export interface MailBodyObjectType {
  id: number;
  from: string;
  subject: string;
  date: string;
  attachments: {
    filename: string;
    contentType: string;
    size: number;
  }[];
  body: string;
  textBody: string;
  htmlBody: string;
}

export type ScreenStatesType = 'loading' | 'home' | 'mail';
