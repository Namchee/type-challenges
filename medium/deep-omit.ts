/* _____________ Your Code Here _____________ */

type DeepOmit<
  Obj extends Record<string, any>,
  Prop extends string,
  Address extends string = ''
> = {
  [Key in keyof Obj as Concat<Address, Key> extends Prop
    ? never
    : Key]: Obj[Key] extends object
    ? DeepOmit<Obj[Key], Prop, Concat<Address, Key>>
    : Obj[Key];
};

type Concat<
  Source extends string,
  Addition extends string | number | symbol
> = Addition extends string
  ? Source extends ''
    ? Addition
    : `${Source}.${Addition}`
  : '';

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type obj = {
  person: {
    name: string;
    age: {
      value: number;
    };
  };
};

type cases = [
  Expect<Equal<DeepOmit<obj, 'person'>, {}>>,
  Expect<
    Equal<DeepOmit<obj, 'person.name'>, { person: { age: { value: number } } }>
  >,
  Expect<Equal<DeepOmit<obj, 'name'>, obj>>,
  Expect<
    Equal<
      DeepOmit<obj, 'person.age.value'>,
      { person: { name: string; age: {} } }
    >
  >
];
