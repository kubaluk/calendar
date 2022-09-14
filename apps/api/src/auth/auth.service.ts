import { Injectable } from "@nestjs/common";
import { User, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import * as argon2 from "argon2";
import { LoginUserInput } from "./dto/login-user-input.dto";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async validateUser(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: username,
      },
    });

    const verifyPassword = await argon2.verify(user?.password, password);

    if (user && verifyPassword) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(loginUserInput: LoginUserInput) {
    return this.validateUser(loginUserInput.email, loginUserInput.password);
  }
}
