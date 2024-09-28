import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OTP_COLLECTION } from './otp.constants';
import { OtpSchema } from './schema/otp.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OTP_COLLECTION, schema: OtpSchema }]),
  ],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
