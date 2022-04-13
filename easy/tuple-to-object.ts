/* _____________ Your Code Here _____________ */

type TupleToObject<T extends readonly any[]> = {
  [E in T[number]]: E;
}

/* _____________ Test Cases _____________ */
// DO NOT EDIT
import { Equal, Expect } from '@type-challenges/utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y'}>>,
]

type error = TupleToObject<[[1, 2], {}]>
