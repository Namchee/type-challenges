/* _____________ Your Code Here _____________ */
type MyOmit<T, K extends keyof T> = {
  [U in keyof T as Exclude<U, K>]: T[U];
}

type MyReadonly2<T, K extends keyof T = keyof T> = { readonly [P in K]: T[P]; } & MyOmit<T, K>;

/* _____________ Test Cases _____________ */
// DO NOT EDIT
import { Alike, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
]

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}
