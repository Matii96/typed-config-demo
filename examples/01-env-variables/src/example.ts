import { ConfigFactory } from "../../../src/config.factory";
import { EnvConfigAdapter } from "../../../src/adapters/env.adapter";
import { Settings } from "./settings";

async function main() {
  console.log("Loading configuration...");
  const config = await ConfigFactory.useTemplate(
    new EnvConfigAdapter(),
    Settings
  );
  console.log("Hello text is: " + config.helloText);
}

main();
