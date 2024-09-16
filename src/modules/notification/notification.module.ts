import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SesModule } from 'src/config/aws/ses/ses.module';

@Module({
  imports: [SesModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
