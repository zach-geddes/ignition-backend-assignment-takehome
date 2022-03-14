import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => User)
  assignTask(@Args('task_id') task_id: string, @Args('user_id') user_id: string) {
    return this.usersService.assignTask(task_id, user_id);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.displayAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.usersService.displayOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Mutation(() => User)
  removeAll() {
    return this.usersService.deleteAll();
  }
}
