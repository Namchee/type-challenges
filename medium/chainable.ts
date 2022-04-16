/* _____________ Your Code Here _____________ */

type Chainable<B = {}> = {
  option<K extends string, V>(key: K, value: V): Chainable<B & { [P in K]: V }>;
  get(): B;
}

/* _____________ Test Cases _____________ */
// DO NOT EDIT
import { Alike, Expect } from '@type-challenges/utils';

declare const a: Chainable

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const foo = a.option('foo', 123).get();

const result2 = a
  .option('name', 'another name')
  .option('name', 'last name')
  .get()

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}
