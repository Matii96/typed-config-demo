import 'reflect-metadata';
import { Type } from '../utils/type.interface';
import { IConfigAdapter } from '../adapters/config-adapter.interface';
import { ConfigInstance } from './config.instance';

/**
 * Container and manager for configurations.
 */
export class Config {
  private static readonly _instances = new Map<Type<any>, ConfigInstance>();

  static async register<TTemplate>(...configs: { template: Type<TTemplate>; adapter: IConfigAdapter }[]) {
    const newConfigs = configs.filter(({ template }) => !this._instances.has(template));
    const instances = newConfigs.map((opts) => new ConfigInstance(opts.template, opts.adapter));
    await Promise.all(instances.map((instance) => instance.refresh()));
    newConfigs.forEach((opts, idx) => this._instances.set(opts.template, instances[idx]));
  }

  static get<TTemplate>(template: Type<TTemplate>) {
    return (this._instances.get(template) as ConfigInstance<TTemplate>).value;
  }

  static acquire<TTemplate>(template: Type<TTemplate>) {
    return this._instances.get(template) as ConfigInstance<TTemplate>;
  }
}
