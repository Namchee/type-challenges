type ExtractToObject<
  T extends Record<string, unknown>,
  U extends keyof T
> = Omit<
  {
    [Key in keyof T as Key extends U ? never : Key]: T[Key];
  } & {
    [Key in keyof T[U]]: T[U][Key];
  },
  never
>;
