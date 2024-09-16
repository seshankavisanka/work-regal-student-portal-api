import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  readonly _id: string;

  @Prop()
  readonly userId: string;

  @Prop()
  readonly studentId: number;

  @Prop()
  readonly firstName: string;

  @Prop()
  readonly lastName: string;

  @Prop()
  readonly username: string;

  @Prop()
  readonly email: string;

  @Prop()
  readonly phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
