import { IsDefined, IsInt, IsString, ValidateNested } from "class-validator";
import { Expose, Type } from "class-transformer";

export class DbSettings {
  @Expose({ name: "db_host" })
  @IsString()
  host: string;

  @IsString()
  port: string;

  @IsString()
  user: string;

  @IsString()
  password: string;
}

export class Settings {
  @IsInt()
  port: number;

  @IsString()
  @Expose({ name: "hello_text" })
  helloText: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => DbSettings)
  db: DbSettings;
}
