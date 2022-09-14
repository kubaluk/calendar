import { ApolloDriverConfig, ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { join } from "@prisma/client/runtime";
import { AppModule } from "src/app.module";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: "3600s" },
      secret: "changeThat",
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
