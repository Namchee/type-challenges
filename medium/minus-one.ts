/* _____________ Your Code Here _____________ */

type MinusOne<T extends number, A extends any[] = []> = [...A, '']['length'] extends T
  ? A['length']
  : MinusOne<T, [...A, '']>;

/* _____________ Test Cases _____________ */
// DO NOT EDIT
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
]
