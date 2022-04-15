/* _____________ Your Code Here _____________ */
// Function === Record<any, any>, so we have to recheck it

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends Record<any, any> ? T[P] extends Function ? T[P] : DeepReadonly<T[P]> : T[P];
}

type ff = Readonly<() => 22>;
/* _____________ Test Cases _____________ */
// DO NOT EDIT
import { Equal, Expect } from '@type-challenges/utils'

type A = DeepReadonly<X>;
type B = DeepReadonly<() => 22>;
type C = DeepReadonly<{ a: number, b: 'string' }>

type cases = [
  Expect<Equal<DeepReadonly<X>, Expected>>,
]

type X = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        }
      ]
    }
  }
}

type Expected = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        }
      ]
    }
  }
}
