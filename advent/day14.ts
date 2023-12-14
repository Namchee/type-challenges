type DecipherNaughtyList<T extends string> = T extends `${infer Name}/${infer Rest}`
	? Name | DecipherNaughtyList<Rest>
	: T;
