import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UserParams {
  @IsNotEmpty()
  @IsMongoId()
  readonly user: string;
}
