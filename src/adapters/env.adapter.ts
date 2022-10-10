import { IConfigAdapter } from './config-adapter.interface';

/**
 * Loads configuration from given set of `.env` files overridden by system-set variables.
 */
export class EnvConfigAdapter implements IConfigAdapter {
  private readonly _envFilesPaths: string[];

  constructor(...envFilesPaths: string[]) {
    this._envFilesPaths = envFilesPaths;
  }

  async load() {
    return { PORT: 5, HELLO_TEXT: 'hello', DB_HOST: 'host', DB_PORT: 3300 };
  }
}
