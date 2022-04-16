/* _____________ Your Code Here _____________ */

type Whitespace = ' ' | '\n' | '\t';

type TrimLeft<S extends string> = S extends `${Whitespace}${infer Back}` ? TrimLeft<Back> : S;

/* _____________ Test Cases _____________ */
// DO NOT EDIT
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]
