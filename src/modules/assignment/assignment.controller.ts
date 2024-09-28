import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentCreateDto } from './dto/assignment.create.dto';
import { AssignmentParams } from './dto/assignment.query.dto';
import { AssignmentUpdateDto } from './dto/assignment.update.dto';

@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get()
  async getAll() {
    return await this.assignmentService.findAll();
  }

  @Post()
  async create(@Body() assignment: AssignmentCreateDto) {
    return await this.assignmentService.create(assignment);
  }

  @Patch(':assignment')
  async updateById(
    @Param() params: AssignmentParams,
    @Body() assignment: AssignmentUpdateDto,
  ) {
    return await this.assignmentService.updateById(
      params.assignment,
      assignment,
    );
  }
}
