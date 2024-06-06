import { Module } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { ReminderController } from './reminder.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reminder, ReminderSchema } from 'src/schemas/reminder.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Reminder.name, schema: ReminderSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ReminderController],
  providers: [ReminderService],
})
export class ReminderModule {}
