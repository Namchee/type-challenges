/* _____________ Your Code Here _____________ */

type FindEles<T extends any[], Anchor = never> = T extends [
  infer El,
  ...infer Rest
]
  ? El extends Anchor
    ? FindEles<Rest, Anchor>
    : El extends Rest[number]
    ? FindEles<Rest, Anchor | El>
    : [El, ...FindEles<Rest, Anchor>]
  : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';
import { ExpectFalse, NotEqual } from '@type-challenges/utils';

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>
];
