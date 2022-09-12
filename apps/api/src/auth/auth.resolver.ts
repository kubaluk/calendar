import { NotFoundException } from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { User } from "./models/user.model";

@Resolver((of) => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query((returns) => [User])
  async users() {
    return this.authService.findAll();
  }
}
