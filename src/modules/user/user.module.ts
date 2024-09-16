import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { USER_COLLECTION } from './user.constants';
import { UsersModule } from 'src/config/auth0/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER_COLLECTION, schema: UserSchema }]),
    UsersModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
