/* _____________ Your Code Here _____________ */

type Stringify<T> = T extends number ? `${T}` : T extends string ? T : never;

type Join<T extends string[], U, S = false> = T extends [infer Char, ...infer Rest]
  ? Char extends string
    ? Rest extends string[]
      ? S extends true
        ? `${Stringify<U>}${Join<T, U, false>}`
        : `${Char}${Join<Rest, U, true>}`
      : ''
    : ''
  : '';

type A = Join<['a', 'p', 'p', 'l', 'e'], '-'>;
type B = Join<['2', '2', '2'], 1>;

/* _____________ Test Cases _____________ */
// DO NOT EDIT
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>,
]
