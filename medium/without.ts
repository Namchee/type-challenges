/* _____________ Your Code Here _____________ */

type WithoutNumber<T extends unknown[], U extends number> = T extends [infer First, ...infer Rest] ? First extends U ? Without<Rest, U> : [First, ...WithoutNumber<Rest, U>] : [];
type WithoutArray<T extends unknown[], U extends number[]> = T extends [infer First, ...infer Rest] ? First extends U[number] ? Without<Rest, U> : [First, ...WithoutArray<Rest, U>] : [];

type Without<T extends unknown[], U extends number | number[]> = U extends number ? WithoutNumber<T, U> : WithoutArray<T, U>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5117/answer
  > View solutions: https://tsch.js.org/5117/solutions
  > More Challenges: https://tsch.js.org
*/
