type MapKey<T extends Record<string, unknown>, U extends Record<string, string>> = {
  [Key in keyof T as Key extends keyof U ? U[Key] : Key]: T[Key];
}

type TestCase = MapKey<{ foo: 'bar', bar: 'baz', camelCase: string }, { foo: 'snek', camelCase: 'snake_case' }>;
