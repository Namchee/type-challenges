/* _____________ Your Code Here _____________ */

type Shift<T extends any[]> = T extends [infer Front, ...infer Rest] ? Rest : T;


/* _____________ Test Cases _____________ */
// DO NOT EDIT
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<['a', 'b', 'c', 'd' ]>, ['b', 'c', 'd']>>,
]
