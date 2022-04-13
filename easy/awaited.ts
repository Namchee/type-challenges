/* _____________ Your Code Here _____________ */

type MyAwaited<P> = P extends Promise<infer V>
  ? V extends Promise<infer T>
    ? MyAwaited<T>
    : V
  : P;


/* _____________ Test Cases _____________ */
// DO NOT EDIT
import { Equal, Expect } from '@type-challenges/utils';

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>

type a = MyAwaited<Z>;

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
]

type error = MyAwaited<number>
