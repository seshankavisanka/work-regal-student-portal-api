import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  readonly studentId: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class LoginVerifyDto {
  @IsNotEmpty()
  @IsString()
  readonly otp: string;

  @IsNotEmpty()
  @Type(() => LoginUserDto)
  @ValidateNested({ each: true })
  readonly user: LoginUserDto;
}

export class PasswordChangeDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
