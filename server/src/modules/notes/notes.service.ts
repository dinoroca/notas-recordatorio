import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from 'src/schemas/note.schema';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private noteModel: Model<Note>,
    private userService: UserService,
  ) {}

  // Find User

  findByIdUser(idUser: string) {
    return this.userService.findOne(idUser);
  }

  // Create note

  async create(idUser: string, createNoteDto: CreateNoteDto) {
    const user = await this.findByIdUser(idUser);
    const createdNote = new this.noteModel({ ...createNoteDto, user: idUser });
    const savedNote = await createdNote.save();
    await user.updateOne({ $push: { notes: savedNote._id } });
    return savedNote;
  }

  // FindAll notes

  findAll() {
    return this.noteModel.find();
  }

  // FindOne note

  async findOne(id: string) {
    const note = await this.noteModel.findById(id);
    if (!note) throw new NotFoundException(`La nota con ID: ${id} no está disponible`);
    return note;
  }

  // Update note

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    const note = await this.findOne(id);
    return await this.noteModel.findByIdAndUpdate(id, updateNoteDto, {
      new: true,
    });
  }

  // Delete note

  async remove(idPost: string, idUser: string) {
    const user = await this.findByIdUser(idUser);
    const note = await this.findOne(idPost);
    await user.updateOne({ $pull: { notes: note._id } });

    return await this.noteModel.findByIdAndDelete(idPost);
  }
}
