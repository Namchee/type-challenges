/* _____________ Your Code Here _____________ */

type FilterUtil<Input extends any[], Filter, Result extends any[]> = Input extends [infer Element, ...infer Rest] ? Element extends Filter ? FilterUtil<Rest, Filter, [...Result, Element]> : FilterUtil<Rest, Filter, Result> : Result;

type Filter<T extends any[], P> = FilterUtil<T, P, []>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Falsy = false | 0 | '' | null | undefined

type cases = [
  Expect<Equal<Filter<[0, 1, 2], 2>, [2]>>,
  Expect<Equal<Filter<[0, 1, 2], 0 | 1>, [0, 1]>>,
  Expect<Equal<Filter<[0, 1, 2], Falsy>, [0]>>,
]
