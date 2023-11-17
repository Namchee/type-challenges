/* _____________ Your Code Here _____________ */

type Square<N extends number> = ArrayOfSquare<
  GetAbsolute<N>,
  ArrayOfLength<GetAbsolute<N>>
>['length'];

type ArrayOfSquare<
  L extends string,
  H extends unknown[],
  Temp extends unknown[] = []
> = H extends [infer _, ...infer Rest]
  ? ArrayOfSquare<L, Rest, [...Temp, ...ArrayOfLength<L>]>
  : Temp;

type ArrayOfLength<
  L extends string,
  Temp extends number[] = []
> = `${Temp['length']}` extends L ? Temp : ArrayOfLength<L, [0, ...Temp]>;

type GetAbsolute<N extends number> = `${N}` extends `-${infer Num}`
  ? Num
  : `${N}`;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Square<0>, 0>>,
  Expect<Equal<Square<1>, 1>>,
  Expect<Equal<Square<3>, 9>>,
  Expect<Equal<Square<20>, 400>>,
  Expect<Equal<Square<100>, 10000>>,

  // Negative numbers
  Expect<Equal<Square<-2>, 4>>,
  Expect<Equal<Square<-5>, 25>>,
  Expect<Equal<Square<-31>, 961>>,
  Expect<Equal<Square<-50>, 2500>>
];
