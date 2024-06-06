import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Reminder } from 'src/schemas/reminder.schema';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';

@Injectable()
export class ReminderService {
  constructor(
    @InjectModel(Reminder.name) private reminderModel: Model<Reminder>,
    private userService: UserService,
  ) {}

  // Find user

  findByIdUser(idUser: string) {
    return this.userService.findOne(idUser);
  }

  // Create reminder

  async create(idUser: string, createReminderDto: CreateReminderDto) {
    const user = await this.findByIdUser(idUser);
    const CreateReminder = await new this.reminderModel({ ...createReminderDto, user: idUser });
    const savedReminder = await CreateReminder.save();
    await user.updateOne({ $push: { reminders: savedReminder._id } });
    return savedReminder;
  }

  // FindAll reminders

  async findAll() {
    return await this.reminderModel.find();
  }

  // Find reminder

  async findOne(id: string) {
    const reminder = await this.reminderModel.findById(id);
    if (!reminder) throw new NotFoundException(`El recordatorio con ID: ${id} no se ha encontrado`);
    return reminder;
  }

  // Update reminder

  async update(id: string, updateReminderDto: UpdateReminderDto) {
    const reminder = await this.findOne(id);
    return await this.reminderModel.findByIdAndUpdate(id, updateReminderDto, {
      new: true,
    });
  }

  // Delete reminder

  async remove(id: string, idUser: string) {
    const user = await this.findByIdUser(idUser);
    const reminder = await this.findOne(id);
    await user.updateOne({ $pull: { reminders: reminder._id } });

    return await this.reminderModel.findByIdAndDelete(id);
  }
}
