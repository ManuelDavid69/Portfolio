import { IsEmail, IsIn, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @IsEmail()
  @MaxLength(200)
  email: string;

  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  message: string;

  /** Hidden field of the form. People leave it empty, simple bots fill it. */
  @IsOptional()
  @IsString()
  @MaxLength(200)
  website?: string;

  @IsIn(['en', 'fr'])
  lang: 'en' | 'fr';
}
