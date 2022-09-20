import { UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Context, Query, Resolver } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { GqlAuthGuard } from "../auth/gql-auth-guard";
import { CalendarService } from "./calendar.service";
import { Calendar } from "./models/calendar.model";
const service = new ConfigService();

@Resolver()
export class CalendarResolver {
  constructor(
    private calendarService: CalendarService,
    private jwtService: JwtService,
  ) {}

  @Query((returns) => [Calendar], { name: "calendars" })
  @UseGuards(GqlAuthGuard)
  async calendars() {
    return this.calendarService.findAll();
  }

  @Query((returns) => [Calendar], { name: "owned" })
  @UseGuards(GqlAuthGuard)
  async owned(@Context("req") req) {
    const user = await this.jwtService.verify(req.cookies.token, {
      secret: service.get<string>("TOKEN_SECRET"),
    });
    return await this.calendarService.findOwned(user.sub);
  }
}
