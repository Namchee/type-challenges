type BoxToys<
	T extends string,
	U extends number,
	Temp extends string[] = []
> = U extends Temp['length']
	? Temp
	: BoxToys<T, U, [...Temp, T]>;
