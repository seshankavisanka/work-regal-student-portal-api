import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly studentId: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[^\s]+$/, {
    message: 'The first name must be a single word without spaces',
  })
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[^\s]+$/, {
    message: 'The last name must be a single word without spaces',
  })
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsMobilePhone()
  readonly phone: string;

  @IsNotEmpty()
  @IsStrongPassword()
  readonly password: string;
}
