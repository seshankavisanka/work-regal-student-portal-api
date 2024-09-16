import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_COLLECTION } from '../user/user.constants';
import { UserSchema } from '../user/schema/user.schema';
import { Auth0Module } from 'src/config/auth0/auth0.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER_COLLECTION, schema: UserSchema }]),
    Auth0Module,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
