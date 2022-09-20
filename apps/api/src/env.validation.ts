import { plainToInstance } from "class-transformer";
import { IsNumber, IsString, validateSync } from "class-validator";

class EnvironmentVariables {
  @IsString()
  POSTGRES_USER: string;

  @IsString()
  POSTGRES_PASSWORD: string;

  @IsString()
  POSTGRES_DB: string;

  @IsString()
  DATABASE_URL: string;

  @IsNumber()
  API_PORT: number;

  @IsString()
  TOKEN_SECRET: string;

  @IsString()
  FRONT_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
