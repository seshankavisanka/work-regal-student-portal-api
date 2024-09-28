import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class NoticeCreateDto {
  @IsNotEmpty()
  @IsString()
  readonly subject: string;

  @IsNotEmpty()
  @IsString()
  readonly notice: string;

  @IsNotEmpty()
  @IsDate()
  readonly issueDate: Date;
}
