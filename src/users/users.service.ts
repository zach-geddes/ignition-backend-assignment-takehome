import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './schema/user.schema';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private tasksService: TasksService,
  ) {}

  create(createUserInput: CreateUserInput) {
    const newUser = new this.userModel(createUserInput);
    return newUser.save();
  }

  async assignTask(task_id: string, user_id: string) {
    const task = await this.tasksService.findOne(task_id);
    const user = await this.findOne(user_id);
    if (task) {
      if(user) {
        // make sure task is not already assigned. if it is, remove from old user
        if (task.userID) {
          await this.userModel.update({_id: task.userID}, {"$pull": { "tasks": { _id: task_id } } });
        }
        // assign task to new user
        task.userID = user_id;
        task.save();
        user.tasks.push(task);
        user.save();
        return user;
      }
      else {
        throw new NotFoundException('User not found.');
      }
    }
    else {
      throw new NotFoundException('Task not found. Create task before assigning.');
    }
  }

  findAll() {
    return this.userModel.find({}).exec();
  }

  displayAll() {
    return this.userModel.find({}).populate('tasks').exec();
  }

  findOne(id: string) {
    return this.userModel.findOne({ _id: id }).exec();
  }

  displayOne(id: string) {
    return this.userModel.findOne({ _id: id }).populate('tasks').exec();
  }

  update(updateUserInput: UpdateUserInput) {
    return this.userModel
      .findOneAndUpdate({ _id: updateUserInput.id }, updateUserInput, {
        upsert: false,
        new: true,
      })
      .exec();
  }

  deleteUser(id: string) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }

  deleteAll() {
    return this.userModel.deleteMany({}).exec();
  }
}
