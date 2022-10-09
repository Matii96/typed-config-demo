import { Config } from '../../../src/manager/config';
import { EnvConfigAdapter } from '../../../src/adapters/env.adapter';
import { Settings } from './settings';

async function main() {
  console.log('Loading configuration...');
  await Config.register({ template: Settings, adapter: new EnvConfigAdapter() });
  console.log('Hello text is: ' + Config.get(Settings).port);
}

main();
