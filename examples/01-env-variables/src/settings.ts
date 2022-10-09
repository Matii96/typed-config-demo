import { IsDefined, IsInt, IsString } from 'class-validator';
import { Nested } from '../../../src/properties-mapping/decorators/nested.decorator';
import { From } from '../../../src/properties-mapping/decorators/from.decorator';

export class DbSettings {
  @From('DB_HOST')
  @IsString()
  host: string;

  @From('DB_PORT')
  @IsInt()
  port: number;
}

export class Settings {
  /**
   * Http port of application.
   */
  @From('PORT')
  @IsInt()
  port: number;

  @From('HELLO_TEXT')
  @IsString()
  helloText: string;

  @Nested(DbSettings)
  @IsDefined()
  db: DbSettings;
}
