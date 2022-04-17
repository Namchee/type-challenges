/* _____________ Your Code Here _____________ */

type Replace<S extends string, From extends string, To extends string> = From extends '' ?
  S :
  S extends `${From}${infer Rest}` ?
  `${To}${Rest}` :
  S extends `${infer A}${infer Back}` ?
  `${A}${Replace<Back, From, To>}` :
  S;


/* _____________ Test Cases _____________ */
// DO NOT EDIT
import type { Equal, Expect } from '@type-challenges/utils'

type A = Replace<'foobarbar', 'bra', 'foo'>;

type cases = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>,
]
