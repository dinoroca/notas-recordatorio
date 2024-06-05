import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

@Schema({
  timestamps: true,
})
export class Reminder {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  paragraph: string;

  @Prop({ trim: true, default: false })
  checkbox: boolean;

  @Prop({ required: true, trim: true })
  dateReminder: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const ReminderSchema = SchemaFactory.createForClass(Reminder);
