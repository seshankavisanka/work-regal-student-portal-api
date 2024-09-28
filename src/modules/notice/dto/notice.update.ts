import { PartialType } from '@nestjs/mapped-types';
import { NoticeCreateDto } from './notice.create';

export class NoticeUpdateDto extends PartialType(NoticeCreateDto) {}
