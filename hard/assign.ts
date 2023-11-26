type MergeObject<
  T extends Record<string, unknown>,
  U extends Record<string, unknown>
> = {
  [Key in keyof T]: Key extends keyof U ? U[Key] : T[Key];
} & {
  [Key in Exclude<keyof U, keyof T>]: U[Key];
};

type Assign<
  T extends Record<string, unknown>,
  U extends unknown[]
> = U extends [infer Obj, ...infer Rest]
  ? Obj extends Record<string, unknown>
    ? Assign<MergeObject<T, Obj>, Rest>
    : Assign<T, Rest>
  : Omit<MergeObject<T, {}>, never>;
