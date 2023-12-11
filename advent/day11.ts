type NotNested = string | boolean | number | Function;

type SantaListProtector<T> = {
	readonly [Key in keyof T]: T[Key] extends NotNested ? T[Key] : SantaListProtector<T[Key]>;
};

type a = SantaListProtector<{a: any;}>
