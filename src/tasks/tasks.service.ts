import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { CreateCommentInput } from '../comments/dto/create-comment.input';
import { Task, TaskDocument } from './schema/task.schema';
import { CommentsService } from '../comments/comments.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>,
    private commentsService: CommentsService,
  ) {}

  create(createTaskInput: CreateTaskInput) {
    const newTask = new this.taskModel(createTaskInput);
    return newTask.save();
  }

  async subtask(subtask_id: string, task_id: string) {
    const subtask = await this.findOne(subtask_id);
    const task = await this.findOne(task_id);
    if (subtask) {
      if(task) {
        task.subtasks.push(subtask)
        task.save();
        return subtask;
      }
      else {
        throw new NotFoundException('Task not found.');
      }
    }
    else {
      throw new NotFoundException('Task not found. Create new task before assigning.');
    }
  }

  async comment(task_id: string, createCommentInput: CreateCommentInput) {
    const task = await this.findOne(task_id);
    if (task) {
      const comment = await this.commentsService.create(createCommentInput);
      comment.taskID = task_id;
      comment.save();
      task.comments.push(comment);
      return task.save();
    }
    else {
      throw new NotFoundException('Task not found. Create task before commenting.');
    }
  }

  findAll() {
    return this.taskModel.find({}).exec();
  }

  displayAll() {
    return this.taskModel.find({}).populate('subtasks').populate('comments').exec();
  }

  findOne(id: string) {
    return this.taskModel.findOne({ _id: id }).exec();
  }

  displayOne(id: string) {
    return this.taskModel.findOne({ _id: id }).populate('subtasks').populate('comments').exec();
  }

  update(updateTaskInput: UpdateTaskInput) {
    return this.taskModel
      .findOneAndUpdate({ _id: updateTaskInput.id }, updateTaskInput, {
        upsert: false,
        new: true,
      })
      .exec();
  }

  deleteTask(id: string) {
    return this.taskModel.deleteOne({ _id: id }).exec();
  }
}
