import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OTP_COLLECTION } from './otp.constants';
import { Model } from 'mongoose';
import { Otp } from './schema/otp.schema';
import { isEmpty, isNotEmpty } from 'class-validator';

@Injectable({ scope: Scope.REQUEST })
export class OtpService {
  constructor(
    @InjectModel(OTP_COLLECTION) private readonly otpModel: Model<Otp>,
  ) {}

  async create(target: string): Promise<Otp> {
    return (await this.otpModel.create({ email: target })).toObject();
  }

  async otpVerify(email: string, otp: string) {
    const otpCheck = await this.otpModel
      .findOne({
        email: email,
        otp: otp,
        attempt: 1,
        createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) },
      })
      .lean();

    if (isEmpty(otpCheck))
      throw new BadRequestException('Invalid or expired OTP.');

    await this.otpModel.findByIdAndUpdate(
      otpCheck._id,
      { $set: { attempt: 0 } },
      { new: true, leam: true },
    );
  }
}
