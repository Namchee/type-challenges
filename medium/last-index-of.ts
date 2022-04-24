/* _____________ Your Code Here _____________ */

type LastIndexOf<T extends any[], U, A extends any[] = [], C = -1> = T extends [infer El, ...infer Rest]
  ? El extends U
    ? LastIndexOf<Rest, U, [...A, El], A['length']>
    : LastIndexOf<Rest, U, [...A, El], C>
  : C;

/* _____________ Test Cases _____________ */
// DO NOT EDIT
import type { Equal, Expect } from '@type-challenges/utils';
import { ExpectFalse, NotEqual } from '@type-challenges/utils';

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
]


