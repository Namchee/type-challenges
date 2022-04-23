/* _____________ Your Code Here _____________ */

type DropChar<S extends string, C extends string> = S extends `${infer Char}${infer Rest}`
  ? Char extends C
    ? DropChar<Rest, C>
    : `${Char}${DropChar<Rest, C>}`
  : S;

/* _____________ Test Cases _____________ */
// DO NOT EDIT
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
  Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
]
