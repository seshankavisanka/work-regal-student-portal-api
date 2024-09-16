import { SendEmailCommand, SESv2Client } from '@aws-sdk/client-sesv2';
import { BadRequestException, Injectable, Logger, Scope } from '@nestjs/common';
import { SendEmailI } from './ses.types';

@Injectable({ scope: Scope.REQUEST })
export class SesService {
  private sesClient: SESv2Client;
  constructor() {
    this.sesClient = new SESv2Client({
      region: `${process.env.AWS_REGION}`,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async sendEmail(email: SendEmailI) {
    const createSendEmailCommand = () => {
      return new SendEmailCommand({
        Destination: {
          ToAddresses: email.toAddresses,
        },
        Content: {
          Simple: {
            Subject: {
              Charset: 'UTF-8',
              Data: `${email.subject}`,
            },
            Body: {
              Html: {
                Charset: 'UTF-8',
                Data: `${email.htmlData}`,
              },
            },
          },
        },
        FromEmailAddress: 'seshankavisanka@gmail.com',
      });
    };

    const sendEmailCommand = createSendEmailCommand();

    try {
      return await this.sesClient.send(sendEmailCommand);
    } catch (e) {
      console.error(e);
      Logger.error('FAILED TO SEND EMAIL');
      throw new BadRequestException(e);
    }
  }
}
