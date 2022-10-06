import { validateSync } from "class-validator";
import { ConfigFactory } from "./config";
import { Settings } from "./settings";

async function main() {
  const config = ConfigFactory.useTemplate(Settings);

  const test = new Settings();
  validate(test);
}

function validate<TConfig extends object>(config: TConfig) {
  const errors = validateSync(config, { skipMissingProperties: false });

  if (errors.length === 0) {
    return;
  }

  const errorsFormatted = errors.map((error) => {
    const errorString = error.toString();
    return errorString.slice(errorString.indexOf(":") + 2);
  });
  const errorFormatted = "\n" + errorsFormatted.join("");

  throw new Error(errorFormatted);
}

main();
