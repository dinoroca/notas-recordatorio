import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from 'src/modules/user/user.service';

import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: RegisterAuthDto) {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    const user = await this.userService.findByEmail(email);
    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        throw new UnauthorizedException('Contraseña incorrecta...');
      }
    } else throw new ConflictException('Usuario no registrado...');

    const payload = {
      idUser: user._id,
      name: user.name,
      surname: user.surname,
    };
    const token = this.jwtService.sign(payload);
    const data = { user, token };
    return data;
  }
}
