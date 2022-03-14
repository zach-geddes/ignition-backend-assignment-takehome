import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTaskInput } from './create-task.input';
import { TaskStatus } from '../entities/task-status.entity.enum';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field(() => String)
  id: string;

  @Field(() => String)
  userID: string;

  @Field(() => String, { description: 'Task Name' })
  name: string;

  @Field(type => TaskStatus)
  taskStatus: TaskStatus;
}
