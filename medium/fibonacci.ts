/* _____________ Your Code Here _____________ */

type Fibonacci<T extends number> = T extends 1 | 2
  ? 1
  : Add<Fibonacci<MinusOne<T>>, Fibonacci<MinusTwo<T>>>;

type MinusOne<T extends number, A extends any[] = []> = [
  ...A,
  ''
]['length'] extends T
  ? A['length']
  : MinusOne<T, [...A, '']>;

type MinusTwo<T extends number> = MinusOne<MinusOne<T>>;

type Add<A extends number, B extends number> = [
  ...ArrayOfLength<A>,
  ...ArrayOfLength<B>
]['length'];

type ArrayOfLength<
  L extends number,
  Temp extends number[] = []
> = Temp['length'] extends L ? Temp : ArrayOfLength<L, [0, ...Temp]>;

type Fifth = Fibonacci<12>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>
];
