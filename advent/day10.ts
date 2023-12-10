type StreetSuffixTester<T extends string, Suffix extends string> = T extends `${infer _}${Suffix}` ? true : false;
