import { UseGuards } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "../auth/gql-auth-guard";
import { User } from "../auth/models/user.model";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => [User], { name: "users" })
  @UseGuards(GqlAuthGuard)
  async users() {
    return this.userService.findAll();
  }
}
