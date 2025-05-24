export interface EmailAttributes {
  id: number;
  type: string;
  subject: string;
  html: string;
  cc?: string;
  bcc?: string;
}

export type emailbody = Pick<EmailAttributes, 'from' | 'to' | 'type'>;
// For `create()` calls, `id` is optional (auto-increment)
export type EmailCreationAttributes = Optional<EmailAttributes, 'id' | 'bcc' | 'cc'>;

export interface Emailresponse {
  accepted: string[];
  rejected: string[];
  ehlo: string[];
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

export interface Envelope {
  from: string;
  to: string[];
}
