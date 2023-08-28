/* _____________ Your Code Here _____________ */

type ParseUrlParams<T extends string> = T extends `${infer Token}/${infer Rest}` ? Token extends `:${infer Param}` ? Param | ParseUrlParams<Rest> : ParseUrlParams<Rest> : T extends `:${infer Param}` ? Param : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ParseUrlParams<''>, never>>,
  Expect<Equal<ParseUrlParams<':id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user'>, 'id' | 'user'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user/like'>, 'id' | 'user'>>,
]
