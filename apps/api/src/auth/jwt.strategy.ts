import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
const service = new ConfigService();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      secretOrKey: service.get<string>("TOKEN_SECRET"),
    });
  }

  private static extractJWT(request: Request): string | null {
    if (
      request.cookies &&
      "token" in request.cookies &&
      request.cookies.token.length > 0
    ) {
      return request.cookies.token;
    }
    return null;
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
