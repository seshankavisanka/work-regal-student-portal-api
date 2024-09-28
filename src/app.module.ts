import { Module } from '@nestjs/common';
import { AuthorizationModule } from './config/authorization/authorization.module';
import { Auth0Module } from './config/auth0/auth0.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { NotificationModule } from './modules/notification/notification.module';
import { SesModule } from './config/aws/ses/ses.module';
import { AssignmentModule } from './modules/assignment/assignment.module';
import { NoticeModule } from './modules/notice/notice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthorizationModule,
    Auth0Module,
    UserModule,
    AuthModule,
    NotificationModule,
    SesModule,
    AssignmentModule,
    NoticeModule,
  ],
})
export class AppModule {}
