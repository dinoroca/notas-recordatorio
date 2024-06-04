import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  title;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  paragraph;
}
