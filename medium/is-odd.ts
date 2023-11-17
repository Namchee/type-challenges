/* _____________ Your Code Here _____________ */

type Odd = '1' | '3' | '5' | '7' | '9';

type IsOdd<T extends number> = GetLastDigit<ToString<T>> extends Odd
  ? true
  : false;

type GetLastDigit<T extends string> = T extends `${infer _}${infer Last}`
  ? Last extends ''
    ? T
    : GetLastDigit<Last>
  : T;

type ToString<T extends number> = `${T}`;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<IsOdd<2023>, true>>,
  Expect<Equal<IsOdd<1453>, true>>,
  Expect<Equal<IsOdd<1926>, false>>,
  Expect<Equal<IsOdd<number>, false>>
];
