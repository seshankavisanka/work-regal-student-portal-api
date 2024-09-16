import { Module } from '@nestjs/common';
import { NotificationTemplateController } from './notification.template.controller';
import { NotificationTemplateService } from './notification.template.service';

@Module({
  controllers: [NotificationTemplateController],
  providers: [NotificationTemplateService]
})
export class NotificationTemplateModule {}
