import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';
import { TaskStatus } from '../entities/task-status.entity.enum'

@InputType()
export class CreateTaskInput {

  @IsString()
  @Field(() => String, { description: 'Task Name' })
  name: string;

  //@Field(type => TaskStatus)
  //taskStatus: TaskStatus;
}
