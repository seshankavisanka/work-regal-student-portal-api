import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NOTICE_COLLECTION } from './notice.constans';
import { Model } from 'mongoose';
import { Notice } from './schema/notice.schema';
import { NoticeCreateDto } from './dto/notice.create';
import { NoticeUpdateDto } from './dto/notice.update';

@Injectable({ scope: Scope.REQUEST })
export class NoticeService {
  constructor(
    @InjectModel(NOTICE_COLLECTION)
    private readonly noticeModel: Model<Notice>,
  ) {}

  async findAll() {
    return await this.noticeModel.find().lean();
  }

  async create(notice: NoticeCreateDto) {
    return (await this.noticeModel.create(notice)).toObject();
  }

  async updateById(noticeId: string, notice: NoticeUpdateDto) {
    return await this.noticeModel.findByIdAndUpdate(
      noticeId,
      Object.fromEntries(
        Object.entries(notice).filter(([_, value]) => value != null),
      ),
      { new: true, lean: true },
    );
  }
}
