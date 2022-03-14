import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Task } from '../../tasks/schema/task.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
  tasks: Task[];
}

export const UserSchema = SchemaFactory.createForClass(User);
