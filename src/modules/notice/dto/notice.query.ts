import { IsMongoId, IsNotEmpty } from 'class-validator';

export class NoticeParams {
  @IsNotEmpty()
  @IsMongoId()
  readonly notice: string;
}
