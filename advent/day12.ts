type Santa = ':santa_tone2:';

type FindSanta<Input extends unknown[], Counter extends unknown[] = []> = Input extends [infer El, ...infer Rest]
  ? El extends Santa
    ? Counter['length']
    : FindSanta<Rest, [...Counter, 0]>
  : never;
