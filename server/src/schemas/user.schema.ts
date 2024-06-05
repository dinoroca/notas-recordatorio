import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Note } from './note.schema';
import { Reminder } from './reminder.schema';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  surname: string;

  @Prop({ required: true, trim: true, unique: true })
  email: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ required: true, trim: true })
  phone: string;

  // Relationships
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }] })
  notes: Note[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reminder' }] })
  reminders: Reminder[];
}

export const UserSchema = SchemaFactory.createForClass(User);
