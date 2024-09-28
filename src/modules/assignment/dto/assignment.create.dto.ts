import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class AssignmentCreateDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly module: string;

  @IsNotEmpty()
  @IsDate()
  readonly issueDate: Date;

  @IsNotEmpty()
  @IsDate()
  readonly submitDate: Date;
}
