/* _____________ Your Code Here _____________ */
type HelloWorld = string; // Expected to be a string


/* _____________ Test Cases _____________ */
// DO NOT EDIT
import { Equal, Expect, NotAny } from '@type-challenges/utils';

type cases = [
  Expect<NotAny<HelloWorld>>,
  Expect<Equal<HelloWorld, string>>,
];
