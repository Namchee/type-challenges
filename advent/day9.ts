type Reverse<T extends string> = T extends `${infer El}${infer Rest}`
  ? `${Reverse<Rest>}${El}`
  : '';
