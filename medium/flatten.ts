/* _____________ Your Code Here _____________ */

type Flatten<Arr extends any[]> = Arr extends [infer Front, ...infer Rest] ?
  Front extends any[] ?
    [...Flatten<Front>, ...Flatten<Rest>] :
    [Front, ...Flatten<Rest>] :
    Arr;

/* _____________ Test Cases _____________ */
// DO NOT EDIT
import type { Equal, Expect } from '@type-challenges/utils'

type A = Flatten<[1, [2]]>;

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>, [{ foo: 'bar'; 2: 10 }, 'foobar']>>,
]
