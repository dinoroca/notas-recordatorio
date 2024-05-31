import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  surname: string;

  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MinLength(9, {
    message: '¡Número muy corto!: Ingrese 9 dígitos',
  })
  @MaxLength(9, {
    message: '¡Número muy largo!: Ingrese 9 dígitos',
  })
  phone: string;
}
