/* _____________ Your Code Here _____________ */

type RemoveIndexSignature<T> = {
  [Key in keyof T as Key extends `${infer RealKey}` ? RealKey : never]: T[Key];
}

/* _____________ Test Cases _____________ */
// DO NOT EDIT
import type { Equal, Expect } from '@type-challenges/utils';

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
}

type FooBar = {
  [key: symbol]: any
  foobar(): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { foobar(): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
]
