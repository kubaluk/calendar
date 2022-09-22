import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CalendarService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.calendar.findMany();
  }

  async findOwned(ownerId: number) {
    return await this.prisma.calendar.findMany({ where: { ownerId: ownerId } });
  }
}
