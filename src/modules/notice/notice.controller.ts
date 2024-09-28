import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeCreateDto } from './dto/notice.create';
import { NoticeParams } from './dto/notice.query';
import { Notice } from './schema/notice.schema';
import { NoticeUpdateDto } from './dto/notice.update';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get()
  async getAll() {
    return await this.noticeService.findAll();
  }

  @Post()
  async create(@Body() notice: NoticeCreateDto) {
    return await this.noticeService.create(notice);
  }

  @Patch(':notice')
  async updateById(
    @Param() params: NoticeParams,
    @Body() notice: NoticeUpdateDto,
  ) {
    return await this.noticeService.updateById(params.notice, notice);
  }
}
