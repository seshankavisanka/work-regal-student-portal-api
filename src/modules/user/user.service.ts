import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USER_COLLECTION } from './user.constants';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/user.create.dto';
import { UsersService } from 'src/config/auth0/users/users.service';
import { isEmpty, isNotEmpty } from 'class-validator';

const t = {
  invalidUserId: 'User is not found',
  userAlreadyExisted: 'User is already existed',
};

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @InjectModel(USER_COLLECTION) private readonly userModel: Model<User>,
    private readonly auth0UsersService: UsersService,
  ) {}

  async findById(id: string) {
    const userCheck = await this.userModel.findById(id).lean();

    if (isEmpty(userCheck)) throw new BadRequestException(t.invalidUserId);

    return userCheck;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    await this.userModel
      .findOne({ email: user.email })
      .lean()
      .then(async (d) => {
        if (isNotEmpty(d)) throw new BadRequestException(t.userAlreadyExisted);
      });

    const username = `${user.firstName.toLowerCase()}${user.lastName.toLowerCase()}`;

    const createdAuth0User = await this.auth0UsersService.createUser({
      name: username,
      nickname: user.firstName,
      email: user.email,
      password: user.password,
    });

    return await this.userModel.create({
      ...user,
      username: username,
      userId: createdAuth0User.user_id,
    });
  }
}
