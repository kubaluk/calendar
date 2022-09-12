import { ApolloDriverConfig, ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "@prisma/client/runtime";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

@Module({
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
