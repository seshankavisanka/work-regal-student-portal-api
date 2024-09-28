import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Assignment extends Document {
  readonly _id: string;

  @Prop()
  readonly name: string;

  @Prop()
  readonly module: string;

  @Prop(Date)
  readonly issueDate: Date;

  @Prop(Date)
  readonly submitDate: Date;

  @Prop(Date)
  readonly createdAt: Date;

  @Prop(Date)
  readonly updatedAt: Date;
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
