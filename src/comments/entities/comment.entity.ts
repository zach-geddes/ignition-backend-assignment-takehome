import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Task } from '../../tasks/entities/task.entity';

@ObjectType()
export class Comment {
  @Field((type) => ID, { nullable: true })
  id: string;

  @Field(() => String)
  taskID: string;

  @Field(() => String)
  text: string;

  @Field(() => [Comment])
  replies: Comment[];
}
