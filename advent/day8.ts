type RemoveNaughtyChildren<T extends object> = {
	[Key in keyof T as Key extends `naughty_${infer _}` ? never : Key]: T[Key];
}
