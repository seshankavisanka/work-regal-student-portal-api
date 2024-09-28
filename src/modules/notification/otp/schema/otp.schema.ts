import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Otp extends Document {
  readonly _id: string;

  @Prop({ index: true })
  readonly email: string;

  @Prop({
    default: () => Math.floor(100000 + Math.random() * 900000).toString(),
    index: true,
  })
  readonly otp: string;

  @Prop({ default: 1 })
  readonly attempt: number;

  @Prop(Date)
  readonly createdAt: Date;

  @Prop(Date)
  readonly updatedAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
