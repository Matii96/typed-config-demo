export class ConfigValidationException extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = ConfigValidationException.name;
  }
}
