import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schema/task.schema';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    CommentsModule,
  ],
  providers: [TasksResolver, TasksService],
  exports: [TasksService],
})
export class TasksModule {}
