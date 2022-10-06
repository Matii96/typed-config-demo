export interface IConfigAdapter {
  load(): Promise<Record<string, any>>;
}
