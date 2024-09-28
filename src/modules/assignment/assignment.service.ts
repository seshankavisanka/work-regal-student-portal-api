import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ASSIGNMENT_COLLECTION } from './assignment.constans';
import { Model } from 'mongoose';
import { Assignment } from './schema/assignment.schema';
import { AssignmentCreateDto } from './dto/assignment.create.dto';
import { AssignmentUpdateDto } from './dto/assignment.update.dto';

@Injectable({ scope: Scope.REQUEST })
export class AssignmentService {
  constructor(
    @InjectModel(ASSIGNMENT_COLLECTION)
    private readonly assignmentModel: Model<Assignment>,
  ) {}

  async findAll() {
    return await this.assignmentModel.find().lean();
  }

  async create(assignment: AssignmentCreateDto) {
    return (await this.assignmentModel.create(assignment)).toObject();
  }

  async updateById(assignmentId: string, assignment: AssignmentUpdateDto) {
    return await this.assignmentModel.findByIdAndUpdate(
      assignmentId,
      Object.fromEntries(
        Object.entries(assignment).filter(([_, value]) => value != null),
      ),
      { new: true, lean: true },
    );
  }
}
