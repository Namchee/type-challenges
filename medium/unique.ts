/* _____________ Your Code Here _____________ */

type Exists<T extends any[], U> = T extends [infer El, ...infer Rest]
  ? Equal<El, U> extends true
    ? true
    : Exists<Rest, U>
  : false;

type Unique<T extends any[], R extends any[] = []> = T extends [infer El, ...infer Rest]
  ? Exists<R, El> extends true
    ? Unique<Rest, R>
    : Unique<Rest, [...R, El]>
  : R;

/* _____________ Test Cases _____________ */
// DO NOT EDIT
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,
]
