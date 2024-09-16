import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Scope,
} from '@nestjs/common';
import { USER_COLLECTION } from '../user/user.constants';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/schema/user.schema';
import { isEmpty } from 'class-validator';
import { Auth0Service } from 'src/config/auth0/auth0.service';
import { UserCredsI } from './auth0.types';
import { UsersService } from 'src/config/auth0/users/users.service';
import { NotificationService } from '../notification/notification.service';

const t = {
  invalidUserEmail: 'User is not found given email address',
  invalidEmailOrPassword: 'Invalid email or password',
};

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    @InjectModel(USER_COLLECTION) private readonly userModel: Model<User>,
    private readonly auth0Service: Auth0Service,
    private readonly auth0UsersService: UsersService,
    private readonly notificationService: NotificationService,
  ) {}

  async login(userCreds: UserCredsI) {
    const userCheck = await this.userModel
      .findOne({
        email: userCreds.email,
      })
      .lean();

    if (isEmpty(userCheck)) throw new BadRequestException(t.invalidUserEmail);

    return await this.auth0Service
      .getAccessToken({
        username: userCheck.email,
        password: userCreds.password,
      })
      .catch(() => {
        throw new ForbiddenException(t.invalidEmailOrPassword);
      });
  }

  async forgotPasswork(email: string) {
    const userCheck = await this.userModel.findOne({ email });
    if (isEmpty(userCheck)) throw new BadRequestException(t.invalidUserEmail);

    const { ticket } = await this.auth0UsersService.passworkChangeTicket(email);

    const data = {
      url: ticket,
    };

    return await this.notificationService.sendNotification(
      email,
      'Password Reset',
      data,
      'change_password(link)',
    );
  }
}
