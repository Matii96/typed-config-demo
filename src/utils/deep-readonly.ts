export type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends Function
  ? T
  : T extends object
  ? DeepReadonlyObject<T>
  : T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export const deepReadonly = <TObject extends object>(object: TObject) => {
  const copy = Array.isArray(object) ? object.slice() : Object.assign({}, object);
  for (const key in copy) {
    if (typeof copy[key] === 'object') {
      copy[key] = deepReadonly(copy[key]);
    }
  }
  return Object.freeze(copy) as DeepReadonly<TObject>;
};
