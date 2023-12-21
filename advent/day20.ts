type Letters = {
  A: [
    '█▀█ ',
    '█▀█ ',
    '▀ ▀ ',
  ],
  B: [
    '█▀▄ ',
    '█▀▄ ',
    '▀▀  '
  ],
  C: [
    '█▀▀ ',
    '█ ░░',
    '▀▀▀ '
  ],
  E: [
    '█▀▀ ',
    '█▀▀ ',
    '▀▀▀ '
  ],
  H: [
    '█ █ ',
    '█▀█ ',
    '▀ ▀ '
  ],
  I: [
    '█ ',
    '█ ',
    '▀ '
  ],
  M: [
    '█▄░▄█ ',
    '█ ▀ █ ',
    '▀ ░░▀ '
  ],
  N: [
    '█▄░█ ',
    '█ ▀█ ',
    '▀ ░▀ '
  ],
  P: [
    '█▀█ ',
    '█▀▀ ',
    '▀ ░░'
  ],
  R: [
    '█▀█ ',
    '██▀ ',
    '▀ ▀ '
  ],
  S: [
    '█▀▀ ',
    '▀▀█ ',
    '▀▀▀ '
  ],
  T: [
    '▀█▀ ',
    '░█ ░',
    '░▀ ░'
  ],
  Y: [
    '█ █ ',
    '▀█▀ ',
    '░▀ ░'
  ],
  W: [
    '█ ░░█ ',
    '█▄▀▄█ ',
    '▀ ░ ▀ '
  ],
  ' ': [
    '░',
    '░',
    '░'
  ],
  ':': [
    '#',
    '░',
    '#'
  ],
  '*': [
    '░',
    '#',
    '░'
  ],
};

type MergeArray<A, B> = A extends [infer ElA extends string, ...infer RestA]
  ? B extends [infer ElB extends string, ...infer RestB]
    ? [`${ElA}${ElB}`, ...MergeArray<RestA, RestB>]
    : A
  : B;

type Flatten<T> = T extends [infer El extends unknown[], ...infer Rest]
  ? [...El, ...Flatten<Rest>]
  : T;

type ToAsciiArt<
  Input extends string,
  Temp extends unknown []= [],
  Result extends unknown[] = [],
> = Input extends `${infer El}${infer Rest}`
  ? El extends '\n'
    ? ToAsciiArt<Rest, [], [...Result, ...Temp]>
    : Uppercase<El> extends keyof Letters
      ? Letters[Uppercase<El>] extends string[]
        ? ToAsciiArt<Rest, MergeArray<Temp, Letters[Uppercase<El>] >, Result>
        : never
      : never
  : Flatten<[...Result, ...Temp]>;
