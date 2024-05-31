import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/shemas/user.schema';
import { Model } from 'mongoose';

import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: RegisterAuthDto) {
    const { password } = createUserDto;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    try {
      const createdUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });
      return await createdUser.save();
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('El usuario ya existe', err);
      }
      throw new ConflictException('Error al crear usuario', err);
    }
  }

  // Buscar usuario x email
  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    // if (!user)
    //   throw new NotFoundException(
    //     `El usuario con correo: ${email} no se ha encontrado`,
    //   );
    return user;
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  update(id: number, updateUserDto: UpdateAuthDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
