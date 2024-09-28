import { Module } from '@nestjs/common';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ASSIGNMENT_COLLECTION } from './assignment.constans';
import { AssignmentSchema } from './schema/assignment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ASSIGNMENT_COLLECTION, schema: AssignmentSchema },
    ]),
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule {}
