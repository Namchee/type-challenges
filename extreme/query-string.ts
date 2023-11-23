type Undup<
  T extends unknown[],
  Result extends unknown[] = [],
  Temp = false
> = T extends [infer El, ...infer Rest]
  ? El extends Temp
    ? Undup<Rest, Result, El>
    : Undup<Rest, [...Result, El], Temp | El>
  : Narrow<Result>;

type Narrow<T extends unknown[]> = T['length'] extends 1 ? T[0] : T;

type Merge<T extends Record<string, unknown>, Key extends string, Value> = {
  [UnionKey in keyof T | Key as UnionKey extends ''
    ? never
    : UnionKey]: UnionKey extends keyof T
    ? UnionKey extends Key
      ? T[UnionKey] extends unknown[]
        ? Undup<[...T[UnionKey], Value]>
        : Undup<[T[UnionKey], Value]>
      : T[UnionKey]
    : Value;
};

type ParseQueryString<
  T extends string,
  Temp extends Record<string, unknown> = {}
> = T extends `${infer A}&${infer B}`
  ? A extends `${infer Key}=${infer Value}`
    ? ParseQueryString<B, Merge<Temp, Key, Value>>
    : ParseQueryString<B, Merge<Temp, A, true>>
  : T extends `${infer Key}=${infer Value}`
  ? Merge<Temp, Key, Value>
  : Merge<Temp, T, true>;
