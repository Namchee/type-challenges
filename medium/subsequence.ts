/* _____________ Your Code Here _____________ */

type Subsequence<
  T extends unknown[],
  Result extends unknown[] = [],
  Temp = any
> = T extends [infer El, ...infer Rest]
  ? Temp extends El
    ? Subsequence<Rest, Result, Temp>
    : Subsequence<Rest, [...Result, El], Temp | El>
  : Result;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<
    Equal<
      Subsequence<[1, 2, 3]>,
      [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3]
    >
  >
];
