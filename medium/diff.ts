
/* _____________ Your Code Here _____________ */

type Exclusive<T, U, V> = T extends U ? T extends V ? never : T : T extends V ? T : never;

type Diff<O, O1> = {
  [Key in (keyof O) | (keyof O1) as Exclusive<Key, keyof O, keyof O1>]: Key extends keyof O ? O[Key] : Key extends keyof O1 ? O1[Key] : never;
}

/* _____________ Test Cases _____________ */
// DO NOT EDIT
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]
