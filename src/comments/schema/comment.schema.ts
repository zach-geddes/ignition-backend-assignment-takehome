import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  _id: mongoose.Types.ObjectId;

  @Prop()
  taskID: string;

  @Prop()
  text: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  replies: Comment[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
