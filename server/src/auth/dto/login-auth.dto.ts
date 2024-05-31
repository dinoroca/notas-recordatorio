import { IsNotEmpty, IsString, IsDefined, IsEmail } from 'class-validator';

export class LoginAuthDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;
}
