import { Module } from '@nestjs/common';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NOTICE_COLLECTION } from './notice.constans';
import { NoticeSchema } from './schema/notice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NOTICE_COLLECTION, schema: NoticeSchema },
    ]),
  ],
  controllers: [NoticeController],
  providers: [NoticeService],
})
export class NoticeModule {}
