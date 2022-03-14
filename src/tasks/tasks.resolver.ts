import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { CreateCommentInput } from '../comments/dto/create-comment.input';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.tasksService.create(createTaskInput);
  }

  @Mutation(() => Task)
  assignSubTask(@Args('subtask_id') subtask_id: string, @Args('task_id') task_id: string) {
    return this.tasksService.subtask(subtask_id, task_id);
  }

  @Mutation(() => Task)
  comment(@Args('task_id') task_id: string, @Args('createCommentInput') createCommentInput: CreateCommentInput) {
    return this.tasksService.comment(task_id, createCommentInput);
  }

  @Query(() => [Task], { name: 'tasks' })
  findAll() {
    return this.tasksService.displayAll();
  }

  @Query(() => Task, { name: 'task' })
  findOne(@Args('id') id: string) {
    return this.tasksService.displayOne(id);
  }

  @Mutation(() => Task)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.tasksService.update(updateTaskInput);
  }

  @Mutation(() => Task)
  removeTask(@Args('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
