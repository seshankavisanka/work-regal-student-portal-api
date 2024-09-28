import { IsMongoId, IsNotEmpty } from 'class-validator';

export class AssignmentParams {
  @IsNotEmpty()
  @IsMongoId()
  readonly assignment: string;
}
