import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}