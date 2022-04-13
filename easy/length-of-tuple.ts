
/* _____________ Your Code Here _____________ */
type Length<T extends any> = T extends readonly any[] ? T['length'] : never;


/* _____________ Test Cases _____________ */
// DO NOT EDIT
import { Equal, Expect } from '@type-challenges/utils'

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type a = Length<typeof tesla>;

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  Length<5>,
  Length<'hello world'>,
]
