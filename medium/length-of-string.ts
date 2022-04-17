/* _____________ Your Code Here _____________ */

type Split<S extends String> = S extends `${infer Char}${infer Rest}` ? [Char, ...Split<Rest>] : [];

type LengthOfString<S extends string> = Split<S>['length'];

/* _____________ Test Cases _____________ */
// DO NOT EDIT
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]
