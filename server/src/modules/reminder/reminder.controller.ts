import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';

@Controller('reminder')
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Post('create/:idUser')
  create(@Param('idUser') id: string, @Body() createReminderDto: CreateReminderDto) {
    return this.reminderService.create(id, createReminderDto);
  }

  @Get('get')
  findAll() {
    return this.reminderService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.reminderService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateReminderDto: UpdateReminderDto) {
    return this.reminderService.update(id, updateReminderDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string, @Query('idUser') idUser) {
    return this.reminderService.remove(id, idUser);
  }
}
