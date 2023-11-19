/* _____________ Your Code Here _____________ */

type Chunk<
  Arr extends unknown[],
  Len extends number,
  Temp extends unknown[] = [],
  Result extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
  ? [...Temp, First]['length'] extends Len
    ? Chunk<Rest, Len, [], [...Result, [...Temp, First]]>
    : Chunk<Rest, Len, [...Temp, First], Result>
  : Temp['length'] extends 0
  ? Result
  : [...Result, Temp];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>
];
