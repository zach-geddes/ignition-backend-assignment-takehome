import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCommentInput } from './dto/create-comment.input';
import { Comment } from './entities/comment.entity';
import { CommentsService } from './comments.service';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  reply(@Args('comment_id') id: string, @Args('createCommentInput') createCommentInput: CreateCommentInput) {
    return this.commentsService.reply(id, createCommentInput);
  }

  @Query(() => [Comment], { name: 'comments' })
  findAll() {
    return this.commentsService.findAll();
  }

  @Query(() => Comment, { name: 'comment' })
  findOne(@Args('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Mutation(() => Comment)
  removeComment(@Args('id') id: string) {
    return this.commentsService.remove(id);
  }
}
