import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Calendar {
  @Field((type) => Int)
  id: number;

  @Field((type) => Int)
  ownerId: number;
}
