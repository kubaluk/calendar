import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle("Calendar")
    .setDescription("Calendar project description")
    .setVersion("1.0")
    .addTag("calendar")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document);
  const service = new ConfigService();
  const port = service.get<string>("API_PORT");
  app.enableCors({
    origin: service.get<string>("FRONT_URL"),
    credentials: true,
  });

  await app.listen(port);
}
bootstrap();
