import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Lenguage } from 'src/enum/reminder.enum';

export class CreateReminderDto {
  @IsString({ message: Lenguage.IsStringTit })
  @IsNotEmpty({ message: Lenguage.IsNotEmptyTit })
  @IsDefined({ message: Lenguage.IsDefinedTit })
  title: string;

  @IsString({ message: Lenguage.IsStringPar })
  @IsNotEmpty({ message: Lenguage.IsNotEmptyPar })
  @IsDefined({ message: Lenguage.IsDefinedPar })
  paragraph: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  checkbox?: boolean;

  @IsDate({ message: Lenguage.IsStringDateRem })
  @IsNotEmpty({ message: Lenguage.IsNotEmptyDateRem })
  @IsDefined({ message: Lenguage.IsDefinedDateRem })
  @Type(() => Date)
  dateReminder: Date;
}
