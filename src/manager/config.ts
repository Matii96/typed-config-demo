import 'reflect-metadata';
import { Type } from '../utils/type.interface';
import { IConfigAdapter } from '../adapters/config-adapter.interface';
import { ConfigInstance } from './config.instance';

/**
 * Container and manager for configurations.
 */
export class Config {
  private static readonly _instances = new Map<Type<any>, ConfigInstance>();

  static async register<TTemplate>(opts: { template: Type<TTemplate>; adapter: IConfigAdapter }) {
    if (this._instances.has(opts.template)) {
      return;
    }
    const instance = new ConfigInstance(opts.template, opts.adapter);
    await instance.refresh();
    this._instances.set(opts.template, instance);
  }

  static get<TTemplate>(template: Type<TTemplate>) {
    return (this._instances.get(template) as ConfigInstance<TTemplate>).value;
  }

  static acquire<TTemplate>(template: Type<TTemplate>) {
    return this._instances.get(template) as ConfigInstance<TTemplate>;
  }
}
