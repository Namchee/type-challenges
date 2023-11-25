/* _____________ Your Code Here _____________ */

type FlipArray<T extends unknown[]> = T extends [infer El, ...infer Rest]
  ? [...FlipArray<Rest>, El]
  : [];

type FlipArguments<T extends (...args: any[]) => unknown> = T extends (
  ...args: infer Type
) => infer Return
  ? (...args: FlipArray<Type>) => Return
  : never;

type Fn = FlipArguments<
  (foo: boolean, bar: string, baz: { name: string }) => void
>;

type b = FlipArguments<(foo: string) => number>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<
    Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>
  >,
  Expect<
    Equal<
      FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>,
      (arg0: boolean, arg1: number, arg2: string) => void
    >
  >
];

type errors = [
  // @ts-expect-error
  FlipArguments<'string'>,
  // @ts-expect-error
  FlipArguments<{ key: 'value' }>,
  // @ts-expect-error
  FlipArguments<['apple', 'banana', 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments<null | undefined>
];
