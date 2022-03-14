import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @Field(() => String)
  name: string;

  @IsEmail()
  @Field(() => String)
  email: string;
}
