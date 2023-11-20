/* _____________ Your Code Here _____________ */

type ToPrimitiveBrute<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends Function
  ? Function
  : T extends bigint
  ? bigint
  : T extends Record<any, unknown>
  ? {
      [Key in keyof T]: ToPrimitiveBrute<T[Key]>;
    }
  : never;

type ToPrimitive<T> = T extends object
  ? {
      [Key in keyof T]: ToPrimitive<T[Key]>;
    }
  : T extends Function
  ? Function
  : T extends { valueOf(): infer Primitive }
  ? Primitive
  : T;

const sample = {
  name: 'Namchee',
  job: 'Software Engineer',
  address: {
    city: 'xxx',
    country: 'Indonesia',
    phone: '123456789',
  },
  lang: ['Go', 'JavaScript', 'Rust'],
};

type a = ToPrimitive<PersonInfo>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type PersonInfo = {
  name: 'Tom';
  age: 30;
  married: false;
  addr: {
    home: '123456';
    phone: '13111111111';
  };
  hobbies: ['sing', 'dance'];
  readonlyArr: readonly ['test'];
  fn: () => any;
};

type ExpectedResult = {
  name: string;
  age: number;
  married: boolean;
  addr: {
    home: string;
    phone: string;
  };
  hobbies: [string, string];
  readonlyArr: readonly [string];
  fn: Function;
};

type cases = [Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>];
