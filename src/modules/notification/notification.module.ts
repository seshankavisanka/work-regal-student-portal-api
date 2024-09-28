import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SesModule } from 'src/config/aws/ses/ses.module';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [SesModule, OtpModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
