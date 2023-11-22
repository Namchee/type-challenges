/* _____________ Your Code Here _____________ */

type Util<T> = T extends string
  ? T extends `${infer Char}${infer Rest}`
    ? Uppercase<Char> extends Char
      ? `_${Lowercase<Char>}${Util<Rest>}`
      : `${Char}${Util<Rest>}`
    : T
  : T;

type SnakeCase<T> = T extends unknown[]
  ? SnakeCase<T[number]>[]
  : T extends Record<string, unknown>
  ? {
      [Key in keyof T as Util<Key>]: SnakeCase<T[Key]>;
    }
  : Util<T>;

type Person = {
  displayName: string;
  userName: string;
  language: string[];
  products: {
    productName: string;
    productId: string;
  }[];
  personalData: {
    nationality: string;
    cityState: string;
  };
};

type TheSamePerson = SnakeCase<Person>;
type a = SnakeCase<'b'>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';
import { ExpectFalse, NotEqual } from '@type-challenges/utils';

type cases = [
  Expect<Equal<SnakeCase<'hello'>, 'hello'>>,
  Expect<Equal<SnakeCase<'userName'>, 'user_name'>>,
  Expect<Equal<SnakeCase<'getElementById'>, 'get_element_by_id'>>,
  Expect<
    Equal<
      SnakeCase<'getElementById' | 'getElementByClassNames'>,
      'get_element_by_id' | 'get_element_by_class_names'
    >
  >
];
