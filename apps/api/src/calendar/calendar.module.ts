import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CalendarResolver } from "./calendar.resolver";
import { CalendarService } from "./calendar.service";

@Module({
  providers: [CalendarResolver, CalendarService, JwtService],
})
export class CalendarModule {}
