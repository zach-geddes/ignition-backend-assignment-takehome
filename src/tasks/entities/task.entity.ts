import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Comment } from '../../comments/entities/comment.entity';
import { TaskStatus } from './task-status.entity.enum';

@ObjectType()
export class Task {
  @Field((type) => ID, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  userID: string;

  @Field(() => String, { description: 'Task Name' })
  name: string;

  //@Field(type => TaskStatus)
  //taskStatus: string;

  @Field(() => [Task])
  subtasks: Task[];

  @Field(() => [Comment])
  comments: Comment[];
}
