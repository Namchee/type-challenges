
/* _____________ Your Code Here _____________ */

type If<C, T, F> = C extends true ? T : F;


/* _____________ Test Cases _____________ */
// DO NOT EDIT
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<If<false, 'a', 2>, 2>>,
]

type error = If<null, 'a', 'b'>
