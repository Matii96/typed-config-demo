import { Type as TransformType } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Type } from '../../utils/type.interface';

export function Nested<T>(type: Type<T>): PropertyDecorator {
  return (target, key) => {
    TransformType(() => type);
    ValidateNested()(target, key);
  };
}
