import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { FilterQuery } from 'mongoose';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('create/:idUser')
  create(@Param('idUser') id: string, @Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(id, createNoteDto);
  }

  @Get('get')
  findAll() {
    return this.notesService.findAll();
  }

  // @Get('get/:id')
  // findOne(@Param('id') id: string) {
  //   return this.notesService.findOne(id);
  // }

  @Get('get/:title')
  obtenerNotasPorTitulo1(@Param('title') title: string) {
    console.log(title);
    return this.notesService.findOneByTitle(title);
  }

  // ****************************************************************
  @Get()
  async obtenerNotasPorTitulo(@Query('title') title: string): Promise<any> {
    console.log(title);
    return this.notesService.findByTitle(title);
  }
  // ************************************************************************************************

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string, @Query('idUser') idUser) {
    return this.notesService.remove(id, idUser);
  }
}
