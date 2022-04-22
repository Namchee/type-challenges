/* _____________ Your Code Here _____________ */

type Zip<T extends any[], U extends any[], A extends any[] = []> =
  T extends [infer ElT, ...infer RestT]
    ? U extends [infer ElU, ...infer RestU]
      ? Zip<RestT, RestU, [...A, [ElT, ElU]]>
      : A
    : A;

/* _____________ Test Cases _____________ */
// DO NOT EDIT
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]
