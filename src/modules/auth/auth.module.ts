import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_COLLECTION } from '../user/user.constants';
import { UserSchema } from '../user/schema/user.schema';
import { Auth0Module } from 'src/config/auth0/auth0.module';
import { UsersModule } from 'src/config/auth0/users/users.module';
import { NotificationModule } from '../notification/notification.module';
import { OtpModule } from '../notification/otp/otp.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER_COLLECTION, schema: UserSchema }]),
    Auth0Module,
    UsersModule,
    NotificationModule,
    OtpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
