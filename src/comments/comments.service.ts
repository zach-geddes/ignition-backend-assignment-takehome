import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentInput } from './dto/create-comment.input';
import { Comment, CommentDocument } from './schema/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: Model<CommentDocument>,
  ) {}

  create(createCommentInput: CreateCommentInput) {
    const newComment = new this.commentModel(createCommentInput);
    return newComment.save();
  }

  async reply(comment_id: string, createCommentInput: CreateCommentInput) {
    const comment = await this.findOne(comment_id);
    if (comment) {
      const reply = await this.create(createCommentInput);
      comment.replies.push();
      return comment.save();
    }
    else {
      throw new NotFoundException('Comment not found. Create comment before replying.');
    }
  }

  findAll() {
    return this.commentModel.find({}).exec();
  }

  displayAll() {
    return this.commentModel.find({}).populate('replies').exec();
  }

  findOne(id: string) {
    return this.commentModel.findOne({ _id: id }).exec();
  }

  displayOne(id: string) {
    return this.commentModel.findOne({ _id: id }).populate('replies').exec();
  }

  remove(id: string) {
    return this.commentModel.deleteOne({ _id: id }).exec();
  }
}
