import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { IConfigAdapter } from "./adapters/config-adapter.interface";
import { ConfigValidationException } from "./config.validation.exception";
import { Type } from "./utils/type.interface";

export class ConfigFactory {
  static async useTemplate<TTemplate>(
    adapter: IConfigAdapter,
    template: Type<TTemplate>
  ) {
    const config = plainToInstance(template, await adapter.load());
    this.validate(config);
    return config;
  }

  private static validate<TConfig>(config: TConfig) {
    const errors = validateSync(config as object, {
      skipMissingProperties: false,
    });

    if (errors.length === 0) {
      return;
    }

    const errorsFormatted = errors.map((error) => {
      const errorString = error.toString();
      return errorString.slice(errorString.indexOf(":") + 2);
    });
    const errorFormatted = "\n" + errorsFormatted.join("");

    throw new ConfigValidationException(errorFormatted);
  }
}
