import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Notice extends Document {
  readonly _id: string;

  @Prop()
  readonly subject: string;

  @Prop()
  readonly notice: string;

  @Prop(Date)
  readonly issueDate: Date;

  @Prop(Date)
  readonly createdAt: Date;

  @Prop(Date)
  readonly updatedAt: Date;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
