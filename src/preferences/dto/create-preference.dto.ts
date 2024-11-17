import { IsString, IsEmail, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BasePreferenceDto } from './base-preference.dto';

export class CreatePreferenceDto {
  @IsString()
  userId: string;

  @IsEmail()
  email: string;

  @ValidateNested()
  @Type(() => BasePreferenceDto)
  preferences: BasePreferenceDto;

  @IsString()
  timezone: string;
}
