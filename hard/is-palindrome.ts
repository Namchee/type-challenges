/* _____________ Your Code Here _____________ */

type Stringify<T extends string | number> = T extends number ? `${T}` : T;
type ToArray<T extends string> = T extends `${infer Char}${infer Rest}`
  ? [Char, ...ToArray<Rest>]
  : [];

type IsPalindromeUtil<T extends string[]> = T extends [
  infer First,
  ...infer Rest extends string[],
  infer Last
]
  ? First extends Last
    ? IsPalindromeUtil<Rest>
    : false
  : true;

type IsPalindrome<T extends string | number> = IsPalindromeUtil<
  ToArray<Stringify<T>>
>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<'abba'>, true>>,
  Expect<Equal<IsPalindrome<'abcba'>, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<2332>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>
];
