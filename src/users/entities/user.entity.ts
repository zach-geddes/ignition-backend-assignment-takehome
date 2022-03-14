import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Task } from '../../tasks/entities/task.entity';

@ObjectType()
export class User {
  @Field((type) => ID, { nullable: true })
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => [Task])
  tasks: Task[];
}
