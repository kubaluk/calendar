import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginUserInput } from "./dto/login-user-input.dto";
import { User } from "./models/user.model";
import { JwtService } from "@nestjs/jwt";
import { GqlAuthGuard } from "./gql-auth-guard";

@Resolver((of) => User)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Mutation((returns) => User)
  async login(
    @Args("loginUserInput") loginUserInput: LoginUserInput,
    @Context("res") res,
  ) {
    const payload = await this.authService.login(loginUserInput);

    res.cookie(
      "token",
      this.jwtService.sign({ username: payload.email, sub: payload.id }),
    );
    return payload;
  }
}
