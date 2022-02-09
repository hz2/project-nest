import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class NewTodoInput {
  @Field()
  name: string;

  @Field(() => Int)
  priority: number;

  @Field()
  completed: boolean;
}