import { IsNotEmpty, IsString, IsDefined, IsEmail } from 'class-validator';
import { LenguageLogin } from 'src/enum/auth.enum';

export class LoginAuthDto {
  @IsDefined({ message: LenguageLogin.IsDefinedEm })
  @IsNotEmpty({ message: LenguageLogin.IsNotEmptyEm })
  @IsEmail({}, { message: LenguageLogin.IsEmailEm })
  email: string;

  @IsDefined({ message: LenguageLogin.IsDefinedPass })
  @IsNotEmpty({ message: LenguageLogin.IsNotEmptyPass })
  @IsString({ message: LenguageLogin.IsStringPass })
  password: string;
}
