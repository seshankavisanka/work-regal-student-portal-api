import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class AssignmentCreateDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly module: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  readonly issueDate: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  readonly submitDate: Date;
}
