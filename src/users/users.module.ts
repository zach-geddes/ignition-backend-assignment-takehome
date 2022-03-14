import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TasksModule,
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
