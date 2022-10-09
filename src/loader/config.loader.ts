import { plainToInstance } from 'class-transformer';
import { Type } from '../utils/type.interface';
import { PropertiesMapping, PropertySource } from '../properties-mapping/mapping.type';
import { ConfigSource, ConfigSourceEntry } from '../adapters/config-adapter.interface';
import { mappedPropertyKey, PROPERTIES_MAPPING_METADATA } from '../properties-mapping/constants';

export class ConfigLoader<TTemplate> {
  private readonly _template: Type<TTemplate>;

  constructor(template: Type<TTemplate>) {
    this._template = template;
  }

  load(source: ConfigSource) {
    return plainToInstance(this._template, this.formatObject(this._template, source, source), {
      enableImplicitConversion: true,
    });
  }

  private formatObject(template: Type<any>, skeleton: ConfigSource, source: ConfigSource) {
    const mapping: PropertiesMapping = Reflect.getMetadata(PROPERTIES_MAPPING_METADATA, template);
    for (const [targetKey, sourceKey] of mapping) {
      skeleton[mappedPropertyKey(targetKey)] = this.getSourceValue(source, sourceKey);
    }
    return skeleton;
  }

  private getSourceValue(source: ConfigSource, key: PropertySource) {
    if (source[key]) return source[key];
    const keyParts = key.split('.');
    let value = source as ConfigSourceEntry;
    for (const keyPart of keyParts) {
      value = value[keyPart];
    }
    return value;
  }
}
