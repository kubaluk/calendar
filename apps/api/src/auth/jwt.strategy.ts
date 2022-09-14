import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: Request) => req?.cookies?.["__session"],
      ]),
      secretOrKey: "changeMe",
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
