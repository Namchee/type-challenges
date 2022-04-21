/* _____________ Your Code Here _____________ */

type IndexOf<T extends any[], U, D extends any[] = []> = T extends [infer El, ...infer Rest]
  ? El extends U
    ? D['length']
    : IndexOf<Rest, U, [...D, El]>
  : -1;


/* _____________ Test Cases _____________ */
// DO NOT EDIT
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
]
