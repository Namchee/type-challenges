/* _____________ Your Code Here _____________ */

type GreaterThan<T extends number, U extends number, A extends any[] = []> = A['length'] extends T
  ? false
  : A['length'] extends U
    ? true
    : GreaterThan<T, U, [...A, '']>

/* _____________ Test Cases _____________ */
// DO NOT EDIT
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
]
