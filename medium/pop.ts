/* _____________ Your Code Here _____________ */

type Pop<T extends any[]> = T extends [...infer A, infer _] ? [...A] : never;


/* _____________ Test Cases _____________ */
// DO NOT EDIT
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd', ]>, ['a', 'b', 'c']>>,
]

