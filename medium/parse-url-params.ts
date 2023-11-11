type ParseUrlParams<T extends string> = T extends `${infer First}/${infer Last}`
  ? First extends `:${infer Sanitized}`
    ? Sanitized | ParseUrlParams<Last>
    : ParseUrlParams<Last>
  : T extends `:${infer Sanitized}`
  ? Sanitized
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<ParseUrlParams<''>, never>>,
  Expect<Equal<ParseUrlParams<':id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user'>, 'id' | 'user'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user/like'>, 'id' | 'user'>>
];
