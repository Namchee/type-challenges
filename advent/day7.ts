type AppendGood<T extends object> = {
  [Key in keyof T as Key extends string ? `good_${Key}` : never]: T[Key];
};
