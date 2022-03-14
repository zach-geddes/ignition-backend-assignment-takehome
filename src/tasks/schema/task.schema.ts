import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Comment } from '../../comments/schema/comment.schema';
import { TaskStatus } from './task-status.schema.enum';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  _id: mongoose.Types.ObjectId;

  @Prop({ nullabe: true })
  userID: string;

  @Prop()
  name: string;

  //@Prop({ type: String, enum: TaskStatus })
  //status: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
  subtasks: Task[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
