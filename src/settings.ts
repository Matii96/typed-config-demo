import { IsInt, IsNumber, IsString, ValidateNested } from "class-validator";

export class DbSettings {
  @IsString()
  connectionString: string;
}

export class Settings {
  constructor() {
    this.db = new DbSettings();
  }

  @IsNumber()
  @IsInt()
  port: number;

  @IsString()
  helloText: string;

  @ValidateNested()
  db: DbSettings;
}
