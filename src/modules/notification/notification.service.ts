import { Injectable, Scope } from '@nestjs/common';
import { promises as fs } from 'fs';
import Handlebars from 'handlebars';
import * as path from 'path';
import { SesService } from 'src/config/aws/ses/ses.service';

@Injectable({ scope: Scope.REQUEST })
export class NotificationService {
  constructor(private readonly sesService: SesService) {}

  async sendNotification(
    to: string,
    subject: string,
    data: object,
    templateName: string,
  ) {
    const filePath = path.join(__dirname, 'templates', `${templateName}.html`);
    const source = await fs.readFile(filePath, 'utf8');

    const template = Handlebars.compile(source);

    const mail = {
      toAddresses: [to],
      htmlData: template(data).toString(),
      subject: subject,
    };

    return await this.sesService.sendEmail(mail);
  }
}
