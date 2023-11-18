/* _____________ Your Code Here _____________ */

type Get<
  Obj extends Record<string, any>,
  Prop extends string,
  LastValue = never
> = Prop extends ''
  ? LastValue
  : Prop extends keyof Obj
  ? Obj[Prop]
  : GetFirstProp<Prop> extends keyof Obj
  ? Obj[GetFirstProp<Prop>] extends object
    ? Get<Obj[GetFirstProp<Prop>], SubProp<Prop>, Obj[GetFirstProp<Prop>]>
    : Obj[GetFirstProp<Prop>]
  : never;

type GetFirstProp<P extends string> = P extends `${infer First}.${infer _}`
  ? First
  : P;

type SubProp<Prop extends string> = Prop extends `${infer _}.${infer Last}`
  ? Last
  : '';

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Get<Data, 'hello'>, 'world'>>,
  Expect<Equal<Get<Data, 'foo.bar.count'>, 6>>,
  Expect<Equal<Get<Data, 'foo.bar'>, { value: 'foobar'; count: 6 }>>,
  Expect<Equal<Get<Data, 'foo.baz'>, false>>,

  Expect<Equal<Get<Data, 'no.existed'>, never>>
];

type Data = {
  'foo': {
    bar: {
      value: 'foobar';
      count: 6;
    };
    included: true;
  };
  'foo.baz': false;
  'hello': 'world';
};
