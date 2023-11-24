/* _____________ Your Code Here _____________ */

type Reverse<T extends unknown[]> = T extends [...infer El, infer Last]
  ? [Last, ...Reverse<El>]
  : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<['a', 'b']>, ['b', 'a']>>,
  Expect<Equal<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>>
];
