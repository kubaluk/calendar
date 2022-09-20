import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
const service = new ConfigService();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: "3600s" },
      secret: service.get<string>("TOKEN_SECRET"),
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
